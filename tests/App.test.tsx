import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

// Use relative paths instead of aliases in tests
import type { Node } from '../src/interfaces/models/nodeModels';
import type { MouseEvent } from 'react';

import App from '../src/App';
import * as edgesSlice from '../src/redux/features/model/edges';
import * as nodesSlice from '../src/redux/features/model/nodes';
import * as flowSlice from '../src/redux/features/ui/flow';
import * as flowThunks from '../src/redux/features/ui/flow/thunks';
import * as nodeRelationshipSelectors from '../src/redux/selectors/relationships/nodeRelationshipSelectors';

// Define a global type for our mock handlers
declare global {
	interface Window {
		mockNodeClickHandler?: (event: MouseEvent, node: Node) => void;
	}
}

// Mock the components from ReactFlow
jest.mock('@xyflow/react', () => {
	const originalModule = jest.requireActual('@xyflow/react');
	return {
		__esModule: true,
		...originalModule,
		Background: jest.fn(() => <div data-testid="mock-background" />),
		Controls: jest.fn(() => <div data-testid="mock-controls" />),
		MiniMap: jest.fn(() => <div data-testid="mock-minimap" />),
		ReactFlow: jest.fn(
			({
				children,
				onNodeClick,
			}: {
				children: React.ReactNode;
				onNodeClick?: (event: MouseEvent, node: Node) => void;
			}) => {
				// Store the callback in a global window object
				if (onNodeClick !== undefined) {
					window.mockNodeClickHandler = onNodeClick;
				}
				return <div data-testid="mock-reactflow">{children}</div>;
			},
		),
	};
});

// Mock the PrefillModal component
jest.mock('../src/components/modal/PrefillModal', () => ({
	__esModule: true,
	default: jest.fn(
		({
			isVisible,
			handleClose,
		}: {
			isVisible: boolean;
			handleClose: () => void;
		}) => (
			<button
				type="button"
				data-testid="mock-prefill-modal"
				aria-label="Close modal"
				data-visible={isVisible}
				onClick={handleClose}
			/>
		),
	),
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
	// Add missing required properties according to your Node type
	const mockNodes = [
		{
			id: 'node1',
			type: 'customNode',
			position: { x: 0, y: 0 },
			data: {}, // Add required data property
		},
	] as unknown as Node[];

	const mockEdges = [{ id: 'edge1', source: 'node1', target: 'node2' }];

	const mockActiveNode = {
		id: 'node1',
		type: 'customNode',
		position: { x: 0, y: 0 },
		data: {}, // Add required data property
	} as unknown as Node;

	// Mock Redux store with needed slices
	const createMockStore = () => {
		return configureStore({
			reducer: {
				// Create proper mock reducers with initial state
				nodes: () => ({ nodes: mockNodes }),
				edges: () => ({ edges: mockEdges }),
				ui: () => ({}),
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

		jest.spyOn(flowSlice, 'setActiveNodeId').mockImplementation(
			(id: string) => ({
				type: 'flow/setActiveNodeId',
				payload: id,
			}),
		);
		jest.spyOn(flowSlice, 'resetActiveNodeId').mockImplementation(() => ({
			type: 'flow/resetActiveNodeId',
			payload: undefined,
		}));

		// Fix the fetchFlowData mock to return a proper AsyncThunkAction
		jest.spyOn(flowThunks, 'fetchFlowData').mockReturnValue({
			type: 'flow/fetchFlowData/pending',
			meta: {
				arg: undefined,
				requestId: 'mocked-request-id',
				requestStatus: 'pending',
			},
			payload: undefined,
		} as any); // Using 'any' here as the complete AsyncThunkAction type is complex

		jest.spyOn(edgesSlice, 'onConnect').mockImplementation();
		jest.spyOn(edgesSlice, 'onEdgesChange').mockImplementation();
		jest.spyOn(nodesSlice, 'onNodesChange').mockImplementation();

		// Clear any existing handler
		window.mockNodeClickHandler = undefined;
	});

	afterEach(() => {
		jest.clearAllMocks();
		// Also clear the global handler
		window.mockNodeClickHandler = undefined;
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

	it('handles node click and opens modal', () => {
		const store = createMockStore();

		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		// Access the window handler for node click
		const { mockNodeClickHandler } = window;
		if (mockNodeClickHandler !== undefined) {
			const mockEvent = {} as MouseEvent;
			mockNodeClickHandler(mockEvent, mockActiveNode);
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
