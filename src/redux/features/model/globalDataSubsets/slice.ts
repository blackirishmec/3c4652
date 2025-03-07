import { createSlice } from '@reduxjs/toolkit';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { PayloadAction } from '@reduxjs/toolkit';

import { globalDataSubsetFetched, globalDataSubsetsFetched } from './actions';
import globalDataSubsetsAdapter from './globalDataSubsetsAdapter';
import initialState from './initialState';

const globalDataSubsetsSlice = createSlice({
	name: 'globalDataSubsets',
	initialState,
	reducers: {
		addGlobalDataSubset: (
			state,
			action: PayloadAction<GlobalDataSubset>,
		) => {
			globalDataSubsetsAdapter.addOne(state, action.payload);
		},
		upsertGlobalDataSubset: (
			state,
			action: PayloadAction<GlobalDataSubset>,
		) => {
			globalDataSubsetsAdapter.upsertOne(state, action.payload);
		},
		removeGlobalDataSubset: (
			state,
			action: PayloadAction<GlobalDataSubset['id']>,
		) => {
			globalDataSubsetsAdapter.removeOne(state, action.payload);
		},
		upsertManyGlobalDataSubsets: (
			state,
			action: PayloadAction<GlobalDataSubset[]>,
		) => {
			globalDataSubsetsAdapter.upsertMany(state, action.payload);
		},
		removeManyGlobalDataSubsets: (
			state,
			action: PayloadAction<GlobalDataSubset['id'][]>,
		) => {
			globalDataSubsetsAdapter.removeMany(state, action.payload);
		},
		removeAllGlobalDataSubsets: state => {
			globalDataSubsetsAdapter.removeAll(state);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				globalDataSubsetFetched,
				(state, { payload: loggedInGlobalDataSubset }) => {
					globalDataSubsetsAdapter.upsertOne(
						state,
						loggedInGlobalDataSubset,
					);
				},
			)
			.addCase(
				globalDataSubsetsFetched,
				(state, { payload: globalDataSubsets }) => {
					globalDataSubsetsAdapter.upsertMany(
						state,
						globalDataSubsets,
					);
				},
			);
	},
});

export const {
	upsertManyGlobalDataSubsets,
	upsertGlobalDataSubset,
	removeAllGlobalDataSubsets,
	removeGlobalDataSubset,
} = globalDataSubsetsSlice.actions;

export default globalDataSubsetsSlice.reducer;
