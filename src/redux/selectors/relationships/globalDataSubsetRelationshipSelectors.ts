/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';

import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';
import type { RootState } from '@/redux/store';

import {
	selectActivePrefillingGlobalDataSubsetDataKey,
	selectActivePrefillingGlobalDataSubsetKey,
} from '@/redux/features/ui/flow';

export const selectActivePrefillingGlobalDataSubset = createSelector(
	[
		selectActivePrefillingGlobalDataSubsetKey,
		(state: RootState) => state.globalDataSubsets.entities,
	],
	(
		activePrefillingGlobalDataSubsetId,
		globalDataSubsetEntities,
	): GlobalDataSubset | undefined => {
		if (activePrefillingGlobalDataSubsetId === undefined) return undefined;

		return globalDataSubsetEntities[activePrefillingGlobalDataSubsetId];
	},
);

export const selectActivePrefillingGlobalDataSubsetData = createSelector(
	[
		selectActivePrefillingGlobalDataSubset,
		selectActivePrefillingGlobalDataSubsetDataKey,
	],
	(
		activePrefillingGlobalDataSubset,
		activePrefillingGlobalDataSubsetId,
	): GlobalDataSubsetData | undefined => {
		if (
			activePrefillingGlobalDataSubset === undefined ||
			activePrefillingGlobalDataSubsetId === undefined
		)
			return undefined;

		return activePrefillingGlobalDataSubset.subsetData.find(
			(subsetData: GlobalDataSubsetData) => {
				return subsetData.id === activePrefillingGlobalDataSubsetId;
			},
		);
	},
);
