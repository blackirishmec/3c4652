import { createSlice } from '@reduxjs/toolkit';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
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
			state.fetchFlowStatus = { ...initialState.fetchFlowStatus };
			state.lastFetchFlow = initialState.lastFetchFlow;
			state.clickedNodeId = initialState.clickedNodeId;
			state.nodeFormFields = [...initialState.nodeFormFields];
			state.clickedNodeFormField = initialState.clickedNodeFormField;
		},
		setClickedNodeId: (
			state,
			{ payload: nodeId }: PayloadAction<Node['id']>,
		) => {
			state.clickedNodeId = nodeId;
			state.clickedNodeFormField = initialState.clickedNodeFormField;
		},
		resetClickedNodeId: state => {
			state.clickedNodeId = initialState.clickedNodeId;
			state.clickedNodeFormField = initialState.clickedNodeFormField;
		},
		setClickedNodeFormField: (
			state,
			{ payload: nodeFormField }: PayloadAction<NodeFormField>,
		) => {
			state.clickedNodeFormField = nodeFormField;
		},
		resetClickedNodeFormField: state => {
			state.clickedNodeFormField = initialState.clickedNodeFormField;
		},
		addNodeFormField: (
			state,
			{ payload: nodeFormFieldToAdd }: PayloadAction<NodeFormField>,
		) => {
			if (
				!state.nodeFormFields.some(field =>
					nodeFormFieldsAreEqual(field, nodeFormFieldToAdd),
				)
			) {
				state.nodeFormFields.push(nodeFormFieldToAdd);
			}
		},
		removeNodeFormField: (
			state,
			{ payload: nodeFormFieldToRemove }: PayloadAction<NodeFormField>,
		) => {
			state.nodeFormFields = state.nodeFormFields.filter(
				field => field !== nodeFormFieldToRemove,
			);
		},
	},
	extraReducers: builder => {
		handleAsyncState({
			builder,
			thunk: fetchFlowData,
			statusStateProperty: 'fetchFlowStatus',
			onFulfilled(state) {
				state.lastFetchFlow = new Date().toISOString();
			},
		});
	},
});

export const {
	resetFlow,
	setClickedNodeId,
	resetClickedNodeId,
	addNodeFormField,
	removeNodeFormField,
	setClickedNodeFormField,
	resetClickedNodeFormField,
} = flowSlice.actions;

export default flowSlice.reducer;
