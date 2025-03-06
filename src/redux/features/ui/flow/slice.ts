import { createSlice } from '@reduxjs/toolkit';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { PayloadAction } from '@reduxjs/toolkit';

import initialState from '@/redux/features/ui/flow/initialState';
import { fetchFlowData } from '@/redux/features/ui/flow/thunks';
import handleAsyncState from '@/redux/utilities/handleAsyncState';

const flowSlice = createSlice({
	name: 'flow',
	initialState,
	reducers: {
		resetFlow: state => {
			state.fetchFlowStatus = { ...initialState.fetchFlowStatus };
			state.lastFetchFlow = initialState.lastFetchFlow;
			state.clickedNodeId = initialState.clickedNodeId;
			state.nodeFormFields = [...initialState.nodeFormFields];
		},
		setClickedNodeId: (
			state,
			{ payload: nodeId }: PayloadAction<Node['id']>,
		) => {
			state.clickedNodeId = nodeId;
		},
		resetClickedNodeId: state => {
			state.clickedNodeId = initialState.clickedNodeId;
		},
		addNodeFormField: (
			state,
			{ payload: nodeFormFieldToAdd }: PayloadAction<NodeFormField>,
		) => {
			if (!state.nodeFormFields.includes(nodeFormFieldToAdd)) {
				state.nodeFormFields.push(nodeFormFieldToAdd);
			}
		},
		removeNodeFormField: (
			state,
			{ payload: nodeFormFieldToRemove }: PayloadAction<NodeFormField>,
		) => {
			if (state.nodeFormFields.includes(nodeFormFieldToRemove)) {
				const index = state.nodeFormFields.indexOf(
					nodeFormFieldToRemove,
				);

				if (index !== -1) {
					state.nodeFormFields.splice(index, 1);
				}
			}
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

export const { resetFlow, setClickedNodeId, resetClickedNodeId } =
	flowSlice.actions;

export default flowSlice.reducer;
