import type { FlowState } from './types';

import statusInitialState from '@/redux/initialStates/statusInitialState';

const initialState: FlowState = {
	fetchFlowDataStatus: { ...statusInitialState },
	lastFetchFlowData: null,
	activeNodeId: undefined,
	nodeFormFieldMappings: [],
	activeNodeFormFieldPropertyKey: undefined,
	activeNodeFormFieldMappedPropertyKey: undefined,
};

export default initialState;
