import type { FlowState } from './types';

import statusInitialState from '@/redux/initialStates/statusInitialState';

const initialState: FlowState = {
	fetchFlowStatus: { ...statusInitialState },
	lastFetchFlow: null,
	clickedNodeId: undefined,
	nodeFormFields: [],
	clickedNodeFormFieldSchemaPropertyKey: undefined,
	clickedNodeFormField: undefined,
};

export default initialState;
