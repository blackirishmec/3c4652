/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';

import axiosInstance from '@/api/axiosInstance';

import { transformNodeResources } from '@/transformers/nodeTransformers';

export const fetchNodes = createAsyncThunk<Node[], void>(
	'nodes/fetchNodes',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<AvantosApiResponse>(
				'actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
			);

			const { nodes } = transformNodeResources(response.data.nodes);

			return nodes;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data ?? error.message);
			}
			return rejectWithValue((error as Error).message);
		}
	},
);
