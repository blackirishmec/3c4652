import type { RootState } from '../../../store';

import globalDataSubsetsAdapter from '@/redux/features/model/globalDataSubsets/globalDataSubsetsAdapter';

const selectGlobalDataSubsetsState = (state: RootState) =>
	state.globalDataSubsets;

export const {
	selectAll: selectAllGlobalDataSubsets,
	selectById: selectGlobalDataSubsetById,
	selectIds: selectGlobalDataSubsetIds,
} = globalDataSubsetsAdapter.getSelectors(selectGlobalDataSubsetsState);
