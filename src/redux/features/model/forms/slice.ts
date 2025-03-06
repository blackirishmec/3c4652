import { createSlice } from '@reduxjs/toolkit';

import type { Form } from '@/interfaces/models/formModels';
import type { PayloadAction } from '@reduxjs/toolkit';

import formsAdapter from '@/redux/features/model/forms/formsAdapter';

import { formFetched, formsFetched } from './actions';
import initialState from './initialState';

const formsSlice = createSlice({
	name: 'forms',
	initialState,
	reducers: {
		addForm: (state, action: PayloadAction<Form>) => {
			formsAdapter.addOne(state, action.payload);
		},
		upsertForm: (state, action: PayloadAction<Form>) => {
			formsAdapter.upsertOne(state, action.payload);
		},
		removeForm: (state, action: PayloadAction<Form['id']>) => {
			formsAdapter.removeOne(state, action.payload);
		},
		upsertManyForms: (state, action: PayloadAction<Form[]>) => {
			formsAdapter.upsertMany(state, action.payload);
		},
		removeManyForms: (state, action: PayloadAction<Form['id'][]>) => {
			formsAdapter.removeMany(state, action.payload);
		},
		removeAllForms: state => {
			formsAdapter.removeAll(state);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(formFetched, (state, { payload: loggedInForm }) => {
				formsAdapter.upsertOne(state, loggedInForm);
			})
			.addCase(formsFetched, (state, { payload: forms }) => {
				formsAdapter.upsertMany(state, forms);
			});
	},
});

export const {
	addForm,
	upsertManyForms,
	upsertForm,
	removeAllForms,
	removeForm,
	removeManyForms,
} = formsSlice.actions;

export default formsSlice.reducer;
