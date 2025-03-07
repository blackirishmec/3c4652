import type { GlobalDataSubsetsState } from './types';
import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

import { globalDataSubsetsAdapter } from '@/redux/features/model/globalDataSubsets/globalDataSubsetsAdapter';

const seededEntities: GlobalDataSubset[] = [
	{
		key: 'Logged User',
		subsetData: [
			{
				key: 'name',
				property: {
					type: 'string',
				},
			},
			{
				key: 'email',
				property: {
					type: 'string',
				},
			},
			{
				key: 'title',
				property: {
					type: 'string',
				},
			},
		],
	},
	{
		key: 'Organization',
		subsetData: [
			{
				key: 'name',
				property: {
					type: 'string',
				},
			},
			{
				key: 'email',
				property: {
					type: 'string',
				},
			},
		],
	},
];

const initialState: GlobalDataSubsetsState =
	globalDataSubsetsAdapter.getInitialState();
const seededState = globalDataSubsetsAdapter.setAll(
	initialState,
	seededEntities,
);

export default seededState;
