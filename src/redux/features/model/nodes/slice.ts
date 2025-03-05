import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { nodessAdapter } from './nodessAdapter';
import { nodesFetched, nodessFetched } from './actions';

const nodessSlice = createSlice({
    name: 'nodess',
    initialState,
    reducers: {
        upsertNodes: nodessAdapter.upsertOne,
        removeNodes: nodessAdapter.removeOne,
        upsertManyNodess: nodessAdapter.upsertMany,
        removeAllNodess: nodessAdapter.removeAll,
    },
    extraReducers(builder) {
        builder
            .addCase(nodesFetched, (state, { payload: loggedInNodes }) => {
                nodessAdapter.upsertOne(state, loggedInNodes);
            })
            .addCase(nodessFetched, (state, { payload: nodess }) => {
                nodessAdapter.upsertMany(state, nodess);
            });
    },
});

export const {
    upsertManyNodess,
    upsertNodes,
    removeAllNodess,
    removeNodes,
} = nodessSlice.actions;

export default nodessSlice.reducer;