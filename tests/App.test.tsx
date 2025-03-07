import * as flowHooks from '@xyflow/react';

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import App from '../src/App';
import * as edgesSlice from '../src/redux/features/model/edges';
import * as nodesSlice from '../src/redux/features/model/nodes';
import * as flowSlice from '../src/redux/features/ui/flow';
import * as flowThunks from '../src/redux/features/ui/flow/thunks';
import * as nodeRelationshipSelectors from '../src/redux/selectors/relationships/nodeRelationshipSelectors';

// Mock the components from ReactFlow
jest.mock('@xyflow/react', () => {
	const originalModule = jest.requireActual('@xyflow/react');
	return {
		__esModule: true,
		...originalModule,
		Background: jest.fn(() => <div data-testid="mock-background" />),
		Controls: jest.fn(() => <div data-testid="mock-controls" />),
		MiniMap: jest.fn(() => <div data-testid="mock-minimap" />),
		ReactFlow: jest.fn(({ children }) => (
			<div data-testid="mock-reactflow">{children}</div>
		)),
	};
});

// Mock the PrefillModal component
jest.mock('../src/components/modal/PrefillModal', () => ({
	__esModule: true,
	default: jest.fn(({ isVisible, handleClose }) => (
		<div
			data-testid="mock-prefill-modal"
			data-visible={isVisible}
			onClick={handleClose}
		/>
	)),
}));

// Mock Logger utility
jest.mock('../src/utilities/Logger', () => ({
	__esModule: true,
	default: {
		errorObject: jest.fn(),
	},
}));

// Mock the node types and edge types
jest.mock('../src/types/AvantosTypes', () => ({
	nodeTypes: { custom: 'mockNodeType' },
	edgeTypes: { custom: 'mockEdgeType' },
}));

describe('App Component', () => {
	const mockNodes = [
		{ id: 'node1', type: 'customNode', position: { x: 0, y: 0 } },
	];
	const mockEdges = [{ id: 'edge1', source: 'node1', target: 'node2' }];
	const mockActiveNode = {
		id: 'node1',
		type: 'customNode',
		position: { x: 0, y: 0 },
	};

	// Mock Redux store with needed slices
	const createMockStore = () => {
		return configureStore({
			reducer: {
				nodes: nodesSlice.default || (() => ({ nodes: mockNodes })),
				edges: edgesSlice.default || (() => ({ edges: mockEdges })),
				ui: flowSlice.default || (() => ({})),
			},
			middleware: getDefaultMiddleware => getDefaultMiddleware(),
		});
	};

	// Spy and mock implementation for selectors and actions
	beforeEach(() => {
		jest.spyOn(nodesSlice, 'selectAllNodes').mockReturnValue(mockNodes);
		jest.spyOn(edgesSlice, 'selectAllEdges').mockReturnValue(mockEdges);
		jest.spyOn(
			nodeRelationshipSelectors,
			'selectActiveNode',
		).mockReturnValue(mockActiveNode);

		jest.spyOn(flowSlice, 'setActiveNodeId').mockImplementation(id => ({
			type: 'flow/setActiveNodeId',
			payload: id,
		}));
		jest.spyOn(flowSlice, 'resetActiveNodeId').mockImplementation(() => ({
			type: 'flow/resetActiveNodeId',
			payload: undefined,
		}));

		jest.spyOn(flowThunks, 'fetchFlowData').mockImplementation(() => ({
			type: 'flow/fetchFlowData',
			async: true,
			payload: Promise.resolve({ nodes: mockNodes, edges: mockEdges }),
		}));

		jest.spyOn(edgesSlice, 'onConnect').mockImplementation();
		jest.spyOn(edgesSlice, 'onEdgesChange').mockImplementation();
		jest.spyOn(nodesSlice, 'onNodesChange').mockImplementation();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without crashing', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		expect(screen.getByTestId('mock-reactflow')).toBeInTheDocument();
		expect(screen.getByTestId('mock-background')).toBeInTheDocument();
		expect(screen.getByTestId('mock-controls')).toBeInTheDocument();
		expect(screen.getByTestId('mock-minimap')).toBeInTheDocument();
		expect(screen.getByTestId('mock-prefill-modal')).toBeInTheDocument();
	});

	it('fetches flow data on mount', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		expect(flowThunks.fetchFlowData).toHaveBeenCalled();
	});

	it('handles node click and opens modal', async () => {
		const user = userEvent.setup();
		const store = createMockStore();

		// Mock the onNodeClick callback from ReactFlow
		const mockOnNodeClick = jest.fn();
		jest.spyOn(flowHooks, 'ReactFlow').mockImplementation(
			({ onNodeClick, children }) => {
				mockOnNodeClick = onNodeClick;
				return <div data-testid="mock-reactflow">{children}</div>;
			},
		);

		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		// Simulate node click
		if (mockOnNodeClick) {
			mockOnNodeClick({} as any, mockActiveNode);
			expect(flowSlice.setActiveNodeId).toHaveBeenCalledWith(
				mockActiveNode.id,
			);
		}
	});

	it('closes modal when handleCloseModal is called', async () => {
		const user = userEvent.setup();
		const store = createMockStore();

		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		// Get the modal and click it to close
		const modal = screen.getByTestId('mock-prefill-modal');
		await user.click(modal);

		expect(flowSlice.resetActiveNodeId).toHaveBeenCalled();
	});
});
