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
};

export default initialState;
