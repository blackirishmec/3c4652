import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { formssAdapter } from './formssAdapter';
import { Forms } from '../../../../interfaces/db_models/formsModels';

const selectFormssState = (state: RootState) => state.formss;

export const {
    selectAll: selectAllFormss,
    selectById: selectFormsById,
    selectIds: selectFormsIds,
} = formssAdapter.getSelectors(selectFormssState);

export const selectFormsNamesById = createSelector(
    [selectAllFormss],
    formss =>
        formss.reduce(
            (acc, forms) => ({
                ...acc,
                [forms.id]: forms.name,
            }),
            {} as Record<Forms['id'], Forms['name']>,
        ),
);