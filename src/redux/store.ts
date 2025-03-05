import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '@/redux/rootReducer';

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: true,
});

// Define types for the store
export type RootState = ReturnType<typeof store.getState>; // Type for root state
export type AppDispatch = typeof store.dispatch; // Type for dispatch function
