import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';
import type { Form } from '@/interfaces/models/formModels';

import formsAdapter from '@/redux/features/model/forms/formsAdapter';

const selectFormsState = (state: RootState) => state.forms;

export const {
	selectAll: selectAllForms,
	selectById: selectFormById,
	selectIds: selectFormIds,
} = formsAdapter.getSelectors(selectFormsState);

export const selectFormNamesById = createSelector([selectAllForms], forms =>
	forms.reduce(
		(acc, form) => ({
			...acc,
			[form.id]: form.name,
		}),
		{} as Record<Form['id'], Form['name']>,
	),
);
