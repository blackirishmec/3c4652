import { createSlice } from '@reduxjs/toolkit';

import type { Edge } from '@/interfaces/models/edgeModels';
import type { PayloadAction } from '@reduxjs/toolkit';

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
		removeManyMealItemMealUsers: (
			state,
			action: PayloadAction<Edge['id'][]>,
		) => {
			edgesAdapter.removeMany(state, action.payload);
		},
		removeAllEdges: state => {
			edgesAdapter.removeAll(state);
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
	removeManyMealItemMealUsers,
	removeAllEdges,
} = edgesSlice.actions;

export default edgesSlice.reducer;
