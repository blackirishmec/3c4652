import { combineReducers } from '@reduxjs/toolkit';

import { formsReducer } from '@/redux/features/model/forms';

// Import other feature reducers as you create them
const rootReducer = combineReducers({
	forms: formsReducer,
});

export default rootReducer;
