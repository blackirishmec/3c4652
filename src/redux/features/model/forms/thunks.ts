/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { Form } from '@/interfaces/models/formModels';

import axiosInstance from '@/api/axiosInstance';

import { transformFormResources } from '@/transformers/formTransformers';

export const fetchForms = createAsyncThunk<Form[], void>(
	'forms/fetchForms',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<AvantosApiResponse>(
				'actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
			);

			const { forms } = transformFormResources(response.data.forms);

			return forms;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data ?? error.message);
			}
			return rejectWithValue((error as Error).message);
		}
	},
);
