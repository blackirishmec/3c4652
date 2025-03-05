import { createSlice } from '@reduxjs/toolkit';

import { nodesFetched, nodesFetched } from './actions';
import { initialState } from './initialState';
import { nodesAdapter } from './nodesAdapter';

const nodesSlice = createSlice({
	name: 'nodes',
	initialState,
	reducers: {
		upsertNodes: nodesAdapter.upsertOne,
		removeNodes: nodesAdapter.removeOne,
		upsertManyNodess: nodesAdapter.upsertMany,
		removeAllNodess: nodesAdapter.removeAll,
	},
	extraReducers(builder) {
		builder
			.addCase(nodesFetched, (state, { payload: loggedInNodes }) => {
				nodesAdapter.upsertOne(state, loggedInNodes);
			})
			.addCase(nodesFetched, (state, { payload: nodes }) => {
				nodesAdapter.upsertMany(state, nodes);
			});
	},
});

export const { upsertManyNodess, upsertNodes, removeAllNodess, removeNodes } =
	nodesSlice.actions;

export default nodesSlice.reducer;
