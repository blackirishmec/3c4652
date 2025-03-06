import { createSlice } from '@reduxjs/toolkit';

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
