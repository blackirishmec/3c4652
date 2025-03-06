import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

import createStatusSelectors from '@/redux/utilities/createStatusSelectors';

export const selectFlowState = (state: RootState) => state.flow;

export const fetchFlowStatusSelectors = createStatusSelectors(
	'fetchFlow',
	(state: RootState) => state.flow.fetchFlowStatus,
);

export const selectFlowLoaded = createSelector(
	[selectFlowState],
	flow => flow.lastFetchFlow !== undefined,
);

export const selectFlowIsLoading = createSelector(
	[selectFlowState],
	flow => flow.fetchFlowStatus.loading === 'loading',
);

export const selectLastFetchFlow = createSelector(
	[selectFlowState],
	flow => flow.lastFetchFlow,
);

export const selectClickedNodeId = createSelector(
	[selectFlowState],
	flow => flow.clickedNodeId,
);

export const selectNodeFormFields = createSelector(
	[selectFlowState],
	flow => flow.nodeFormFields,
);

export const selectClickedNodeFormField = createSelector(
	[selectFlowState],
	flow => flow.clickedNodeFormField,
);
