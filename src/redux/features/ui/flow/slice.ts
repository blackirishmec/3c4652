import { createSlice } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

import { newNodeFormFieldMappingCreated } from '@/redux/features/ui/flow/actions';
import initialState from '@/redux/features/ui/flow/initialState';
import { fetchFlowData } from '@/redux/features/ui/flow/thunks';
import handleAsyncState from '@/redux/utilities/handleAsyncState';
import nodeFormFieldsAreEqual from '@/redux/utilities/nodeFormFieldsAreEqual';

const flowSlice = createSlice({
	name: 'flow',
	initialState,
	reducers: {
		resetFlow: state => {
			state.fetchFlowDataStatus = { ...initialState.fetchFlowDataStatus };
			state.lastFetchFlowData = initialState.lastFetchFlowData;
			state.nodeFormFieldMappings = [
				...initialState.nodeFormFieldMappings,
			];
			state.activeNodeId = initialState.activeNodeId;
			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;
			state.activePrefillingNodeId = initialState.activePrefillingNodeId;
			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
			state.availableDataSearchTerm =
				initialState.availableDataSearchTerm;
		},

		addNodeFormFieldMapping: (
			state,
			{
				payload: nodeFormFieldToAdd,
			}: PayloadAction<NodeFormFieldMapping>,
		) => {
			if (
				!state.nodeFormFieldMappings.some(field =>
					nodeFormFieldsAreEqual(field, nodeFormFieldToAdd),
				)
			) {
				state.nodeFormFieldMappings.push(nodeFormFieldToAdd);
			}
		},
		removeNodeFormFieldMapping: (
			state,
			{
				payload: nodeFormFieldToRemove,
			}: PayloadAction<NodeFormFieldMapping>,
		) => {
			state.nodeFormFieldMappings = state.nodeFormFieldMappings.filter(
				field => !nodeFormFieldsAreEqual(field, nodeFormFieldToRemove),
			);
		},

		setActiveNodeId: (
			state,
			{ payload: nodeId }: PayloadAction<Node['id']>,
		) => {
			state.activeNodeId = nodeId;

			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;
			state.activePrefillingNodeId = initialState.activePrefillingNodeId;
			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
		},
		resetActiveNodeId: state => {
			state.activeNodeId = initialState.activeNodeId;

			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;
			state.activePrefillingNodeId = initialState.activePrefillingNodeId;
			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
		},

		setActiveNodeFormFieldPropertyKey: (
			state,
			{
				payload: newActiveNodeFormFieldPropertyKey,
			}: PayloadAction<FormFieldSchemaPropertiesArrayValue['key']>,
		) => {
			state.activeNodeFormFieldPropertyKey =
				newActiveNodeFormFieldPropertyKey;
		},
		resetActiveNodeFormFieldPropertyKey: state => {
			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;

			state.activePrefillingNodeId = initialState.activePrefillingNodeId;
			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
		},

		setActivePrefillingNodeId: (
			state,
			{ payload: nodeId }: PayloadAction<Node['id']>,
		) => {
			state.activePrefillingNodeId = nodeId;

			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
		},
		resetActivePrefillingNodeId: state => {
			state.activePrefillingNodeId = initialState.activePrefillingNodeId;

			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
		},

		setActivePrefillingNodeFormFieldMappedPropertyKey: (
			state,
			{
				payload: newActiveNodeFormFieldMappedPropertyKey,
			}: PayloadAction<FormFieldSchemaPropertiesArrayValue['key']>,
		) => {
			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				newActiveNodeFormFieldMappedPropertyKey;
		},
		resetActivePrefillingNodeFormFieldMappedPropertyKey: state => {
			state.activePrefillingNodeFormFieldSchemaPropertyKey =
				initialState.activePrefillingNodeFormFieldSchemaPropertyKey;
		},

		setAvailableDataSearchTerm: (
			state,
			{ payload: newAvailableDataSearchTerm }: PayloadAction<string>,
		) => {
			state.availableDataSearchTerm = newAvailableDataSearchTerm;
		},
		resetAvailableDataSearchTerm: state => {
			state.availableDataSearchTerm =
				initialState.availableDataSearchTerm;
		},
	},
	extraReducers: builder => {
		handleAsyncState({
			builder,
			thunk: fetchFlowData,
			statusStateProperty: 'fetchFlowDataStatus',
			onFulfilled(state) {
				state.lastFetchFlowData = new Date().toISOString();
			},
		});

		builder.addCase(
			newNodeFormFieldMappingCreated,
			(state, { payload: newNodeFormFieldMapping }) => {
				state.nodeFormFieldMappings.push(newNodeFormFieldMapping);
			},
		);
	},
});

export const {
	addNodeFormFieldMapping,
	removeNodeFormFieldMapping,
	resetActivePrefillingNodeFormFieldMappedPropertyKey,
	resetActiveNodeFormFieldPropertyKey,
	resetActiveNodeId,
	resetActivePrefillingNodeId,
	resetFlow,
	setActivePrefillingNodeFormFieldMappedPropertyKey,
	setActiveNodeFormFieldPropertyKey,
	setActiveNodeId,
	setActivePrefillingNodeId,
	setAvailableDataSearchTerm,
	resetAvailableDataSearchTerm,
} = flowSlice.actions;

export default flowSlice.reducer;
