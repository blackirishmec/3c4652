import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../main';
import { Nodes } from '../../../../interfaces/db_models/nodesModels';
import { LaravelArrayResource, LaravelResource } from '../../../interfaces/resources/laravelResources';
import { LaravelArrayResponse, LaravelResponse } from '../../../../services/LaravelResponseService';
import { NodesResource } from '../../../interfaces/resources/nodesResources';
import { transformNodesResource, transformNodesResources } from '../../../transformers/nodesTransformers';
import axios from 'axios';

export const fetchNodes = createAsyncThunk<Nodes, Nodes['id']>(
    'nodess/fetchNodes',
    async (nodesId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelResource<NodesResource>>(
                '/nodess/' + nodesId,
            );

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
    'nodess/fetchNodess',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelArrayResource<NodesResource>>(
                '/nodess',
            );

            const laravelResponse = new LaravelArrayResponse(response.data);
            const { nodess } = transformNodesResources(laravelResponse.items);

            return nodess;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);