import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Nodes } from '../../../../interfaces/db_models/nodesModels';
import type {
	LaravelArrayResource,
	LaravelResource,
} from '../../../interfaces/resources/laravelResources';
import type { NodesResource } from '../../../interfaces/resources/nodesResources';

import { axiosInstance } from '../../../../main';
import {
	LaravelArrayResponse,
	LaravelResponse,
} from '../../../../services/LaravelResponseService';
import {
	transformNodesResource,
	transformNodesResources,
} from '../../../transformers/nodesTransformers';

export const fetchNodes = createAsyncThunk<Nodes, Nodes['id']>(
	'nodes/fetchNodes',
	async (nodesId, { dispatch, rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<
				LaravelResource<NodesResource>
			>(`/nodes/${nodesId}`);

			const laravelResponse = new LaravelResponse(response.data);
			const { nodes } = transformNodesResource(laravelResponse.item);

			return nodes;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data || error.message);
			}
			return rejectWithValue((error as Error).message);
		}
	},
);

export const fetchNodess = createAsyncThunk<Nodes[], void>(
	'nodes/fetchNodess',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response =
				await axiosInstance.get<LaravelArrayResource<NodesResource>>(
					'/nodes',
				);

			const laravelResponse = new LaravelArrayResponse(response.data);
			const { nodes } = transformNodesResources(laravelResponse.items);

			return nodes;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data || error.message);
			}
			return rejectWithValue((error as Error).message);
		}
	},
);
