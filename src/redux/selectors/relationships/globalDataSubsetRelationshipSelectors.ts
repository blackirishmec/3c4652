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
		activePrefillingGlobalDataSubsetKey,
		globalDataSubsetEntities,
	): GlobalDataSubset | undefined => {
		if (activePrefillingGlobalDataSubsetKey === undefined) return undefined;

		return globalDataSubsetEntities[activePrefillingGlobalDataSubsetKey];
	},
);

export const selectActivePrefillingGlobalDataSubsetData = createSelector(
	[
		selectActivePrefillingGlobalDataSubset,
		selectActivePrefillingGlobalDataSubsetDataKey,
	],
	(
		activePrefillingGlobalDataSubset,
		activePrefillingGlobalDataSubsetKey,
	): GlobalDataSubsetData | undefined => {
		if (
			activePrefillingGlobalDataSubset === undefined ||
			activePrefillingGlobalDataSubsetKey === undefined
		)
			return undefined;

		return activePrefillingGlobalDataSubset.subsetData.find(
			(subsetData: GlobalDataSubsetData) => {
				return subsetData.key === activePrefillingGlobalDataSubsetKey;
			},
		);
	},
);
