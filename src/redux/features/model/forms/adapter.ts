import { createEntityAdapter } from '@reduxjs/toolkit';
import { Forms } from '../../../../interfaces/db_models/formsModels';

export const formssAdapter = createEntityAdapter<Forms, number>({
    selectId: forms => forms.id,
    sortComparer: false,
});