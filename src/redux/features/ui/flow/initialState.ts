import type { FlowState } from './types';

import statusInitialState from '@/redux/initialStates/statusInitialState';

const initialState: FlowState = {
	fetchFlowDataStatus: { ...statusInitialState },
	lastFetchFlowData: null,
	nodeFormFieldMappings: [],
	activeNodeId: undefined,
	activeNodeFormFieldPropertyKey: undefined,
	activePrefillingNodeId: undefined,
	activePrefillingNodeFormFieldSchemaPropertyKey: undefined,
	availableDataSearchTerm: undefined,
	globalData: [
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
	],
	activePrefillingGlobalDataSubsetKey: undefined,
	activePrefillingGlobalDataSubsetDataKey: undefined,
};

export default initialState;
