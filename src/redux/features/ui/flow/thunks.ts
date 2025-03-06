/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { Edge } from '@/interfaces/models/edgeModels';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AppDispatch } from '@/redux/store';

import axiosInstance from '@/api/axiosInstance';

import { edgesFetched } from '@/redux/features/model/edges/actions';
import { formsFetched } from '@/redux/features/model/forms/actions';
import { nodesFetched } from '@/redux/features/model/nodes/actions';

import { transformEdgeResources } from '@/transformers/edgeTransformers';
import { transformFlowResource } from '@/transformers/flowTransformers';
import { transformFormResources } from '@/transformers/formTransformers';
import { transformNodeResources } from '@/transformers/nodeTransformers';

interface FetchFlowDataProps {
	edges: Edge[];
	nodes: Node[];
	forms: Form[];
}
export const fetchFlowData = createAsyncThunk<
	FetchFlowDataProps,
	void,
	{ dispatch: AppDispatch }
>('flow/fetchFlow', async (_, { rejectWithValue, dispatch }) => {
	try {
		const { data } = await axiosInstance.get<AvantosApiResponse>(
			'actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
		);

		const { edgeResources, nodeResources, formResources } =
			transformFlowResource({ data });

		const { edges } = transformEdgeResources(edgeResources);
		const { nodes } = transformNodeResources({
			edgeResources,
			nodeResources,
		});
		const { forms } = transformFormResources(formResources);

		dispatch(edgesFetched(edges));
		dispatch(nodesFetched(nodes));
		dispatch(formsFetched(forms));

		return { edges, nodes, forms };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return rejectWithValue(error.response?.data ?? error.message);
		}
		return rejectWithValue((error as Error).message);
	}
});
