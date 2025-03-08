import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import type { Node } from '../src/interfaces/models/nodeModels';
import type { MouseEvent } from 'react';

import App from '../src/App';
import * as edgesSlice from '../src/redux/features/model/edges';
import * as nodesSlice from '../src/redux/features/model/nodes';
import * as flowSlice from '../src/redux/features/ui/flow';
import * as flowThunks from '../src/redux/features/ui/flow/thunks';
import * as nodeRelationshipSelectors from '../src/redux/selectors/relationships/nodeRelationshipSelectors';

declare global {
	interface Window {
		mockNodeClickHandler?: (event: MouseEvent, node: Node) => void;
	}
}

jest.mock('../src/redux/features/model/edges');
jest.mock('../src/redux/features/model/nodes');
jest.mock('../src/redux/features/ui/flow');
jest.mock('../src/redux/features/ui/flow/thunks');
jest.mock('../src/redux/selectors/relationships/nodeRelationshipSelectors');

jest.mock('@xyflow/react', () => {
	function MockReactFlow({
		children,
		onNodeClick,
	}: {
		children: React.ReactNode;
		onNodeClick?: (event: MouseEvent, node: Node) => void;
	}) {
		if (onNodeClick) {
			window.mockNodeClickHandler = onNodeClick;
		}
		return <div data-testid="mock-reactflow">{children}</div>;
	}

	return {
		__esModule: true,
		Background: () => <div data-testid="mock-background" />,
		Controls: () => <div data-testid="mock-controls" />,
		MiniMap: () => <div data-testid="mock-minimap" />,
		ReactFlow: MockReactFlow,
	};
});

jest.mock('../src/components/modal/PrefillModal', () => ({
	__esModule: true,
	default: ({
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
}));

jest.mock('../src/utilities/Logger', () => ({
	__esModule: true,
	default: {
		errorObject: jest.fn(),
	},
}));

describe('App Component', () => {
	const mockActiveNode = {
		id: 'node1',
		type: 'form' as const,
		position: { x: 0, y: 0 },
		data: {
			approval_required: false,
			approval_roles: [],
			component_id: 'test-component',
			component_key: 'test-key',
			component_type: 'form',
			id: 'node1',
			input_mapping: {},
			name: 'Test Node',
			permitted_roles: null,
			prerequisites: null,
			edge_to: false,
			edge_from: false,
			prefill_enabled: true,
		},
		discriminant: 'Node',
	} as Node;

	const mockNodes = [mockActiveNode] as Node[];

	const mockEdges = [{ id: 'edge1', source: 'node1', target: 'node2' }];

	const createMockStore = () => {
		return configureStore({
			reducer: {
				nodes: () => ({ nodes: mockNodes }),
				edges: () => ({ edges: mockEdges }),
				ui: () => ({}),
			},
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					serializableCheck: false,
				}),
		});
	};

	beforeEach(() => {
		jest.clearAllMocks();

		jest.mocked(nodesSlice.selectAllNodes).mockReturnValue(mockNodes);
		jest.mocked(edgesSlice.selectAllEdges).mockReturnValue(mockEdges);
		jest.mocked(nodeRelationshipSelectors.selectActiveNode).mockReturnValue(
			mockActiveNode,
		);

		jest.mocked(flowSlice.setActiveNodeId).mockImplementation(id => ({
			type: 'flow/setActiveNodeId',
			payload: id,
		}));
		jest.mocked(flowSlice.resetActiveNodeId).mockImplementation(() => ({
			type: 'flow/resetActiveNodeId',
			payload: undefined,
		}));

		const mockFetchFlowData = createAsyncThunk(
			'flow/fetchFlowData',
			() => ({
				edges: mockEdges,
				nodes: mockNodes,
				forms: [],
			}),
		);
		jest.mocked(flowThunks.fetchFlowData).mockImplementation(() =>
			mockFetchFlowData(),
		);

		window.mockNodeClickHandler = undefined;
	});

	afterEach(() => {
		jest.clearAllMocks();
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

		const { mockNodeClickHandler } = window;
		if (mockNodeClickHandler) {
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

		const modal = screen.getByTestId('mock-prefill-modal');
		await user.click(modal);

		expect(flowSlice.resetActiveNodeId).toHaveBeenCalled();
	});
});
