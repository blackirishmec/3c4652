import { combineReducers } from '@reduxjs/toolkit';

import { formsReducer } from '@/redux/features/model/forms';
import { nodesReducer } from '@/redux/features/model/nodes';

// Import other feature reducers as you create them
const rootReducer = combineReducers({
	forms: formsReducer,
	nodes: nodesReducer,
});

export default rootReducer;
