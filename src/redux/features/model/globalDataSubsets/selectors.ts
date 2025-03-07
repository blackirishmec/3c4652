import { createSelector } from '@reduxjs/toolkit';

import type { GlobalDataSubset } from '../../../../interfaces/db_models/globalDataSubsetModels';
import type { RootState } from '../../../store';

import globalDataSubsetsAdapter from './globalDataSubsetsAdapter';

const selectGlobalDataSubsetsState = (state: RootState) =>
	state.globalDataSubsets;

export const {
	selectAll: selectAllGlobalDataSubsets,
	selectById: selectGlobalDataSubsetById,
	selectIds: selectGlobalDataSubsetIds,
} = globalDataSubsetsAdapter.getSelectors(selectGlobalDataSubsetsState);

export const selectGlobalDataSubsetNamesById = createSelector(
	[selectAllGlobalDataSubsets],
	globalDataSubsets =>
		globalDataSubsets.reduce(
			(acc, globalDataSubset) => ({
				...acc,
				[globalDataSubset.id]: globalDataSubset.name,
			}),
			{} as Record<GlobalDataSubset['id'], GlobalDataSubset['name']>,
		),
);
