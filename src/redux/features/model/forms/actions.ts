import { createAction } from '@reduxjs/toolkit';
import { Forms } from '../../../../interfaces/db_models/formsModels';

export const formsFetched = createAction<Forms>('formss/formsFetched');
export const formssFetched = createAction<Forms[]>('formss/formssFetched');