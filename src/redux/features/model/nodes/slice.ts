import { applyNodeChanges } from '@xyflow/react';

import { createSlice } from '@reduxjs/toolkit';

import type { Node } from '@/interfaces/models/nodeModels';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { NodeChange } from '@xyflow/react';

import nodesAdapter from '@/redux/features/model/nodes/nodesAdapter';

import { nodeFetched, nodesFetched } from './actions';
import initialState from './initialState';

const nodesSlice = createSlice({
	name: 'nodes',
	initialState,
	reducers: {
		addNode: (state, action: PayloadAction<Node>) => {
			nodesAdapter.addOne(state, action.payload);
		},
		upsertNode: (state, action: PayloadAction<Node>) => {
			nodesAdapter.upsertOne(state, action.payload);
		},
		removeNode: (state, action: PayloadAction<Node['id']>) => {
			nodesAdapter.removeOne(state, action.payload);
		},
		upsertManyNodes: (state, action: PayloadAction<Node[]>) => {
			nodesAdapter.upsertMany(state, action.payload);
		},
		removeManyNodes: (state, action: PayloadAction<Node['id'][]>) => {
			nodesAdapter.removeMany(state, action.payload);
		},
		removeAllNodes: state => {
			nodesAdapter.removeAll(state);
		},
		onNodesChange: (state, action: PayloadAction<NodeChange<Node>[]>) => {
			const { entities } = state;

			const nodes = Object.entries(entities).reduce<Node[]>(
				(acc, [entityId]) => {
					const entity = entities[entityId];

					if (entity !== undefined) acc.push(entity);

					return acc;
				},
				[],
			);

			const updatedNodes = applyNodeChanges(action.payload, nodes);

			nodesAdapter.setAll(state, updatedNodes);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(nodeFetched, (state, { payload: loggedInNodes }) => {
				nodesAdapter.upsertOne(state, loggedInNodes);
			})
			.addCase(nodesFetched, (state, { payload: nodes }) => {
				nodesAdapter.upsertMany(state, nodes);
			});
	},
});

export const {
	addNode,
	upsertNode,
	removeNode,
	upsertManyNodes,
	removeManyNodes,
	removeAllNodes,
	onNodesChange,
} = nodesSlice.actions;

export default nodesSlice.reducer;
