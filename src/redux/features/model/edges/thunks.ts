/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { Edge } from '@/interfaces/models/edgeModels';

import axiosInstance from '@/api/axiosInstance';

import { transformEdgeResources } from '@/transformers/edgeTransformers';
import { transformFlowResource } from '@/transformers/flowTransformers';

export const fetchEdges = createAsyncThunk<Edge[], void>(
	'edges/fetchEdges',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.get<AvantosApiResponse>(
				'actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
			);

			const { edgeResources } = transformFlowResource({ data });

			const { edges } = transformEdgeResources(edgeResources);
			return edges;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data ?? error.message);
			}
			return rejectWithValue((error as Error).message);
		}
	},
);
