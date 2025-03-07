import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { selectActiveNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import App from './App';

jest.mock('@/redux/selectors/relationships/nodeRelationshipSelectors');
jest.mock('@xyflow/react', () => ({
	ReactFlow: () => null,
	Background: () => null,
	MiniMap: () => null,
	Controls: () => null,
}));

const mockStore = configureStore([]);

describe('App', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			model: {
				nodes: [],
				edges: [],
			},
		});
		(selectActiveNode as jest.Mock).mockReturnValue(undefined);
	});

	it('renders ReactFlow component', () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		expect(store.getActions()).toEqual([
			expect.objectContaining({
				type: 'ui/flow/fetchFlowData/pending',
			}),
		]);
	});

	it('handles node clicks', () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		const expectedActions = [
			expect.objectContaining({
				type: 'ui/flow/fetchFlowData/pending',
			}),
		];

		expect(store.getActions()).toEqual(expectedActions);
	});
});
