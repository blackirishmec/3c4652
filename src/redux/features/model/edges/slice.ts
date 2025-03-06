import { addEdge as defaultAddEdge, applyEdgeChanges } from '@xyflow/react';

import { createSlice } from '@reduxjs/toolkit';

import type { Edge } from '@/interfaces/models/edgeModels';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Connection, EdgeChange } from '@xyflow/react';

import edgesAdapter from '@/redux/features/model/edges/edgesAdapter';

import { edgeFetched, edgesFetched } from './actions';
import initialState from './initialState';

const edgesSlice = createSlice({
	name: 'edges',
	initialState,
	reducers: {
		addEdge: (state, action: PayloadAction<Edge>) => {
			edgesAdapter.addOne(state, action.payload);
		},
		upsertEdge: (state, action: PayloadAction<Edge>) => {
			edgesAdapter.upsertOne(state, action.payload);
		},
		removeEdge: (state, action: PayloadAction<Edge['id']>) => {
			edgesAdapter.removeOne(state, action.payload);
		},
		upsertManyEdges: (state, action: PayloadAction<Edge[]>) => {
			edgesAdapter.upsertMany(state, action.payload);
		},
		removeManyEdges: (state, action: PayloadAction<Edge['id'][]>) => {
			edgesAdapter.removeMany(state, action.payload);
		},
		removeAllEdges: state => {
			edgesAdapter.removeAll(state);
		},
		onEdgesChange: (state, action: PayloadAction<EdgeChange<Edge>[]>) => {
			const { entities } = state;

			const edges = Object.entries(entities).reduce<Edge[]>(
				(acc, [entityId]) => {
					const entity = entities[entityId];

					if (entity !== undefined) acc.push(entity);

					return acc;
				},
				[],
			);

			const updatedEdges = applyEdgeChanges(action.payload, edges);

			edgesAdapter.setAll(state, updatedEdges);
		},
		onConnect: (state, action: PayloadAction<Connection>) => {
			const { entities } = state;

			const edges = Object.entries(entities).reduce<Edge[]>(
				(acc, [entityId]) => {
					const entity = entities[entityId];

					if (entity !== undefined) acc.push(entity);

					return acc;
				},
				[],
			);

			const edgesToAdd = defaultAddEdge(action.payload, edges);

			edgesAdapter.setAll(state, edgesToAdd);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(edgeFetched, (state, { payload: loggedInEdges }) => {
				edgesAdapter.upsertOne(state, loggedInEdges);
			})
			.addCase(edgesFetched, (state, { payload: edges }) => {
				edgesAdapter.upsertMany(state, edges);
			});
	},
});

export const {
	addEdge,
	upsertEdge,
	removeEdge,
	upsertManyEdges,
	removeManyEdges,
	removeAllEdges,
	onEdgesChange,
	onConnect,
} = edgesSlice.actions;

export default edgesSlice.reducer;
