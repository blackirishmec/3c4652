import { createSlice } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

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
			state.activeNodeId = initialState.activeNodeId;
			state.nodeFormFieldMappings = [
				...initialState.nodeFormFieldMappings,
			];
			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;
			state.activeNodeFormFieldMappedPropertyKey =
				initialState.activeNodeFormFieldMappedPropertyKey;
		},

		setActiveNodeId: (
			state,
			{ payload: nodeId }: PayloadAction<Node['id']>,
		) => {
			state.activeNodeId = nodeId;

			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;
			state.activeNodeFormFieldMappedPropertyKey =
				initialState.activeNodeFormFieldMappedPropertyKey;
		},
		resetActiveNodeId: state => {
			state.activeNodeId = initialState.activeNodeId;

			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;
			state.activeNodeFormFieldMappedPropertyKey =
				initialState.activeNodeFormFieldMappedPropertyKey;
		},

		setActiveNodeFormFieldPropertyKey: (
			state,
			{
				payload: clickedNodeFormFieldSchemaPropertyKey,
			}: PayloadAction<AvantosFieldSchemaPropertiesArrayValue['key']>,
		) => {
			state.activeNodeFormFieldPropertyKey =
				clickedNodeFormFieldSchemaPropertyKey;
		},
		resetActiveNodeFormFieldPropertyKey: state => {
			state.activeNodeFormFieldPropertyKey =
				initialState.activeNodeFormFieldPropertyKey;

			state.activeNodeFormFieldMappedPropertyKey =
				initialState.activeNodeFormFieldMappedPropertyKey;
		},

		setActiveNodeFormFieldMappedPropertyKey: (
			state,
			{ payload: nodeFormField }: PayloadAction<NodeFormFieldMapping>,
		) => {
			state.activeNodeFormFieldMappedPropertyKey = nodeFormField;
		},
		resetActiveNodeFormFieldMappedPropertyKey: state => {
			state.activeNodeFormFieldMappedPropertyKey =
				initialState.activeNodeFormFieldMappedPropertyKey;
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
				field => field !== nodeFormFieldToRemove,
			);
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
	},
});

export const {
	resetFlow,
	setActiveNodeId,
	resetActiveNodeId,
	addNodeFormFieldMapping,
	removeNodeFormFieldMapping,
	setActiveNodeFormFieldMappedPropertyKey,
	resetActiveNodeFormFieldMappedPropertyKey,
	setActiveNodeFormFieldPropertyKey,
	resetActiveNodeFormFieldPropertyKey,
} = flowSlice.actions;

export default flowSlice.reducer;
