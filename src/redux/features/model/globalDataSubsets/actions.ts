import { createAction } from '@reduxjs/toolkit';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

export const globalDataSubsetFetched = createAction<GlobalDataSubset>(
	'globalDataSubsets/globalDataSubsetFetched',
);
export const globalDataSubsetsFetched = createAction<GlobalDataSubset[]>(
	'globalDataSubsets/globalDataSubsetsFetched',
);
