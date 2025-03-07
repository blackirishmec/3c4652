import { combineReducers } from '@reduxjs/toolkit';

import { edgesReducer } from '@/redux/features/model/edges';
import { formsReducer } from '@/redux/features/model/forms';
import { globalDataSubsetsReducer } from '@/redux/features/model/globalDataSubsets';
import { nodesReducer } from '@/redux/features/model/nodes';
import { flowReducer } from '@/redux/features/ui/flow';

// Import other feature reducers as you create them
const rootReducer = combineReducers({
	forms: formsReducer,
	nodes: nodesReducer,
	edges: edgesReducer,
	flow: flowReducer,
	globalDataSubset: globalDataSubsetsReducer,
});

export default rootReducer;
