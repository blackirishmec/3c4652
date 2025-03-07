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
			id: 'Logged User Data',
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
	],
};

export default initialState;
