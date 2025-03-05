import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { formssAdapter } from './formssAdapter';
import { formsFetched, formssFetched } from './actions';

const formssSlice = createSlice({
    name: 'formss',
    initialState,
    reducers: {
        upsertForms: formssAdapter.upsertOne,
        removeForms: formssAdapter.removeOne,
        upsertManyFormss: formssAdapter.upsertMany,
        removeAllFormss: formssAdapter.removeAll,
    },
    extraReducers(builder) {
        builder
            .addCase(formsFetched, (state, { payload: loggedInForms }) => {
                formssAdapter.upsertOne(state, loggedInForms);
            })
            .addCase(formssFetched, (state, { payload: formss }) => {
                formssAdapter.upsertMany(state, formss);
            });
    },
});

export const {
    upsertManyFormss,
    upsertForms,
    removeAllFormss,
    removeForms,
} = formssSlice.actions;

export default formssSlice.reducer;