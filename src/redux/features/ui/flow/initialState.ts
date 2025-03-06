import type { FlowState } from './types';

import statusInitialState from '@/redux/initialStates/statusInitialState';

const initialState: FlowState = {
	fetchFlowStatus: { ...statusInitialState },
	lastFetchFlow: undefined,
	edges: [],
	nodes: [],
};

export default initialState;
