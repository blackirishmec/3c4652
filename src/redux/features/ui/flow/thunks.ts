/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type {
	AvantosApiResponse,
	NodeFormFieldMapping,
} from '@/interfaces/AvantosInterfaces';
import type { Edge } from '@/interfaces/models/edgeModels';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AppDispatch, RootState } from '@/redux/store';

import axiosInstance from '@/api/axiosInstance';

import { edgesFetched } from '@/redux/features/model/edges/actions';
import { formsFetched } from '@/redux/features/model/forms/actions';
import { nodesFetched } from '@/redux/features/model/nodes/actions';
import { newNodeFormFieldMappingCreated } from '@/redux/features/ui/flow/actions';
import {
	selectActiveNodeFormFieldPropertyKey,
	selectActivePrefillingNodeFormFieldSchemaPropertyKey,
} from '@/redux/features/ui/flow/selectors';
import { selectNodeFormFieldMappingByActiveNode } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import {
	selectActiveNode,
	selectActivePrefillingNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';
import nodeFormFieldsAreEqual from '@/redux/utilities/nodeFormFieldsAreEqual';

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

export const saveSelectedPrefillMapping = createAsyncThunk<
	void,
	void,
	{ dispatch: AppDispatch }
>('flow/fetchFlow', (_, { dispatch, getState }) => {
	const state = getState() as RootState;

	const activeNode = selectActiveNode(state);
	const activeNodeFormFieldPropertyKey =
		selectActiveNodeFormFieldPropertyKey(state);
	const activePrefillingNode = selectActivePrefillingNode(state);
	const activePrefillingNodeFormFieldSchemaPropertyKey =
		selectActivePrefillingNodeFormFieldSchemaPropertyKey(state);
	const nodeFormFieldMappingByActiveNode =
		selectNodeFormFieldMappingByActiveNode(state);

	if (
		activeNode === undefined ||
		activeNodeFormFieldPropertyKey === undefined ||
		activePrefillingNode === undefined ||
		activePrefillingNodeFormFieldSchemaPropertyKey === undefined
	)
		return;

	const tempNodeFormFieldMappingByActiveNode: NodeFormFieldMapping = {
		nodeId: activeNode.id,
		nodeFormFieldSchemaPropertyKey: activeNodeFormFieldPropertyKey,
		prefillingNodeId: activePrefillingNode.id,
		prefillingNodeFormFieldSchemaPropertyKey:
			activePrefillingNodeFormFieldSchemaPropertyKey,
	};

	if (
		nodeFormFieldMappingByActiveNode === undefined ||
		!nodeFormFieldsAreEqual(
			nodeFormFieldMappingByActiveNode,
			tempNodeFormFieldMappingByActiveNode,
		)
	) {
		dispatch(
			newNodeFormFieldMappingCreated(
				tempNodeFormFieldMappingByActiveNode,
			),
		);
	}
});
