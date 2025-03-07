import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { Edge } from '@/interfaces/models/edgeModels';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AppDispatch, RootState } from '@/redux/store';

import axiosInstance from '@/api/axiosInstance';

import { edgesFetched } from '@/redux/features/model/edges/actions';
import { formsFetched } from '@/redux/features/model/forms/actions';
import { nodesFetched } from '@/redux/features/model/nodes/actions';
import {
	existingNodeFormFieldMappingUpdated,
	newNodeFormFieldMappingCreated,
} from '@/redux/features/ui/flow/actions';
import {
	nodeFormFieldMappingIsUpdate,
	nodeFormFieldMappingsAreEqual,
} from '@/redux/features/ui/flow/utils';
import {
	selectSavedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
	selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
	selectVirtualActiveNodeFormFieldMapping,
} from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';

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

	// ***
	const savedNodeFormFieldMappingByActiveNode =
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey(state);
	const savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier =
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier(
			state,
		);
	// ***

	const virtualActiveNodeFormFieldMapping =
		selectVirtualActiveNodeFormFieldMapping(state);

	if (virtualActiveNodeFormFieldMapping === undefined) {
		return;
	}

	if (
		savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier ===
		undefined
	) {
		dispatch(
			newNodeFormFieldMappingCreated(virtualActiveNodeFormFieldMapping),
		);
	} else if (
		nodeFormFieldMappingIsUpdate(
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
			virtualActiveNodeFormFieldMapping,
		)
	) {
		dispatch(
			existingNodeFormFieldMappingUpdated(
				virtualActiveNodeFormFieldMapping,
			),
		);
	} else if (
		!nodeFormFieldMappingsAreEqual(
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
			virtualActiveNodeFormFieldMapping,
		)
	) {
		dispatch(
			newNodeFormFieldMappingCreated(virtualActiveNodeFormFieldMapping),
		);
	}
});
