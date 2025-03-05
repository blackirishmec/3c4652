import { createAction } from '@reduxjs/toolkit';

import type { Form } from '@/interfaces/models/formModels';

export const formFetched = createAction<Form>('forms/formFetched');
export const formsFetched = createAction<Form[]>('forms/formsFetched');
