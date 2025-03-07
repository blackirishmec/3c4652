import { createSlice } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
	existingNodeFormFieldMappingUpdated,
	newNodeFormFieldMappingCreated,
} from '@/redux/features/ui/flow/actions';
import initialState from '@/redux/features/ui/flow/initialState';
import { fetchFlowData } from '@/redux/features/ui/flow/thunks';
import {
	nodeFormFieldMappingIsUpdate,
	nodeFormFieldMappingsAreEqual,
} from '@/redux/features/ui/flow/utils';
import handleAsyncState from '@/redux/utilities/handleAsyncState';

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
			state.activePrefillingGlobalDataSubsetId =
				initialState.activePrefillingGlobalDataSubsetId;
			state.activePrefillingGlobalDataSubsetDataKey =
				initialState.activePrefillingGlobalDataSubsetDataKey;
		},

		addNodeFormFieldMapping: (
			state,
			{
				payload: nodeFormFieldToAdd,
			}: PayloadAction<NodeFormFieldMapping>,
		) => {
			if (
				!state.nodeFormFieldMappings.some(field =>
					nodeFormFieldMappingsAreEqual(field, nodeFormFieldToAdd),
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
				field =>
					!nodeFormFieldMappingsAreEqual(
						field,
						nodeFormFieldToRemove,
					),
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

		setActivePrefillingGlobalDataSubsetKey: (
			state,
			{
				payload: globalDataSubsetKey,
			}: PayloadAction<GlobalDataSubset['id']>,
		) => {
			state.activePrefillingGlobalDataSubsetId = globalDataSubsetKey;

			state.activePrefillingGlobalDataSubsetDataKey =
				initialState.activePrefillingGlobalDataSubsetDataKey;
		},
		resetPrefillingActiveGlobalDataSubsetKey: state => {
			state.activePrefillingGlobalDataSubsetId =
				initialState.activePrefillingGlobalDataSubsetId;

			state.activePrefillingGlobalDataSubsetDataKey =
				initialState.activePrefillingGlobalDataSubsetDataKey;
		},

		setActivePrefillingGlobalDataSubsetDataKey: (
			state,
			{
				payload: globalDataSubsetDataKey,
			}: PayloadAction<GlobalDataSubsetData['id']>,
		) => {
			state.activePrefillingGlobalDataSubsetDataKey =
				globalDataSubsetDataKey;
		},
		resetPrefillingActiveGlobalDataSubsetDataKey: state => {
			state.activePrefillingGlobalDataSubsetDataKey =
				initialState.activePrefillingGlobalDataSubsetDataKey;
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

		builder
			.addCase(
				newNodeFormFieldMappingCreated,
				(state, { payload: newNodeFormFieldMapping }) => {
					state.nodeFormFieldMappings.push(newNodeFormFieldMapping);
				},
			)
			.addCase(
				existingNodeFormFieldMappingUpdated,
				(state, { payload: updatedNodeFormFieldMapping }) => {
					state.nodeFormFieldMappings =
						state.nodeFormFieldMappings.map(
							existingNodeFormFieldMapping => {
								if (
									nodeFormFieldMappingIsUpdate(
										existingNodeFormFieldMapping,
										updatedNodeFormFieldMapping,
									)
								) {
									return updatedNodeFormFieldMapping;
								}

								return existingNodeFormFieldMapping;
							},
						);
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
	setActivePrefillingGlobalDataSubsetKey,
	resetPrefillingActiveGlobalDataSubsetKey,
	setActivePrefillingGlobalDataSubsetDataKey,
	resetPrefillingActiveGlobalDataSubsetDataKey,
} = flowSlice.actions;

export default flowSlice.reducer;
