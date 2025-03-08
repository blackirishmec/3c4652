import type { GlobalDataSubsetsState } from './types';
import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

import globalDataSubsetsAdapter from '@/redux/features/model/globalDataSubsets/globalDataSubsetsAdapter';

const seededEntities: GlobalDataSubset[] = [
	{
		id: 'Logged User',
		subsetData: [
			{
				id: 'name',
				property: {
					type: 'string',
				},
			},
			{
				id: 'email',
				property: {
					type: 'string',
				},
			},
			{
				id: 'title',
				property: {
					type: 'string',
				},
			},
		],
		discriminant: 'GlobalDataSubset',
	},
	{
		id: 'Organization',
		subsetData: [
			{
				id: 'name',
				property: {
					type: 'string',
				},
			},
			{
				id: 'email',
				property: {
					type: 'string',
				},
			},
		],
		discriminant: 'GlobalDataSubset',
	},
];

const initialState: GlobalDataSubsetsState =
	globalDataSubsetsAdapter.getInitialState();
const seededState = globalDataSubsetsAdapter.setAll(
	initialState,
	seededEntities,
);

export default seededState;
