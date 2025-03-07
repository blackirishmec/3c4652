import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../main';
import { GlobalDataSubset } from '../../../../interfaces/db_models/globalDataSubsetModels';
import { LaravelArrayResource, LaravelResource } from '../../../interfaces/resources/laravelResources';
import { LaravelArrayResponse, LaravelResponse } from '../../../../services/LaravelResponseService';
import { GlobalDataSubsetResource } from '../../../interfaces/resources/globalDataSubsetResources';
import { transformGlobalDataSubsetResource, transformGlobalDataSubsetResources } from '../../../transformers/globalDataSubsetTransformers';
import axios from 'axios';

export const fetchGlobalDataSubset = createAsyncThunk<GlobalDataSubset, GlobalDataSubset['id']>(
    'globalDataSubsets/fetchGlobalDataSubset',
    async (globalDataSubsetId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelResource<GlobalDataSubsetResource>>(
                '/globalDataSubsets/' + globalDataSubsetId,
            );

            const laravelResponse = new LaravelResponse(response.data);
            const { globalDataSubset } = transformGlobalDataSubsetResource(laravelResponse.item);

            return globalDataSubset;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);

export const fetchGlobalDataSubsets = createAsyncThunk<GlobalDataSubset[], void>(
    'globalDataSubsets/fetchGlobalDataSubsets',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelArrayResource<GlobalDataSubsetResource>>(
                '/globalDataSubsets',
            );

            const laravelResponse = new LaravelArrayResponse(response.data);
            const { globalDataSubsets } = transformGlobalDataSubsetResources(laravelResponse.items);

            return globalDataSubsets;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);