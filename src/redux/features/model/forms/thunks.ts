import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../main';
import { Forms } from '../../../../interfaces/db_models/formsModels';
import { LaravelArrayResource, LaravelResource } from '../../../interfaces/resources/laravelResources';
import { LaravelArrayResponse, LaravelResponse } from '../../../../services/LaravelResponseService';
import { FormsResource } from '../../../interfaces/resources/formsResources';
import { transformFormsResource, transformFormsResources } from '../../../transformers/formsTransformers';
import axios from 'axios';

export const fetchForms = createAsyncThunk<Forms, Forms['id']>(
    'formss/fetchForms',
    async (formsId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelResource<FormsResource>>(
                '/formss/' + formsId,
            );

            const laravelResponse = new LaravelResponse(response.data);
            const { forms } = transformFormsResource(laravelResponse.item);

            return forms;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);

export const fetchFormss = createAsyncThunk<Forms[], void>(
    'formss/fetchFormss',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelArrayResource<FormsResource>>(
                '/formss',
            );

            const laravelResponse = new LaravelArrayResponse(response.data);
            const { formss } = transformFormsResources(laravelResponse.items);

            return formss;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);