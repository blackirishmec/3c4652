import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

import createStatusSelectors from '@/redux/utilities/createStatusSelectors';

export const selectFlowState = (state: RootState) => state.flow;

export const fetchFlowStatusSelectors = createStatusSelectors(
	'fetchFlow',
	(state: RootState) => state.flow.fetchFlowDataStatus,
);

export const selectFlowLoaded = createSelector(
	[selectFlowState],
	flow => flow.lastFetchFlowData !== undefined,
);

export const selectFlowIsLoading = createSelector(
	[selectFlowState],
	flow => flow.fetchFlowDataStatus.loading === 'loading',
);

export const selectLastFetchFlow = createSelector(
	[selectFlowState],
	flow => flow.lastFetchFlowData,
);

export const selectClickedNodeId = createSelector(
	[selectFlowState],
	flow => flow.activeNodeId,
);

export const selectNodeFormFields = createSelector(
	[selectFlowState],
	flow => flow.nodeFormFieldMappings,
);

export const selectSelectedClickedNodeFormField = createSelector(
	[selectFlowState],
	flow => flow.activeNodeFormFieldMappedPropertyKey,
);

export const selectSelectedClickedNodeFormFieldSchemaPropertyKey =
	createSelector(
		[selectFlowState],
		flow => flow.activeNodeFormFieldPropertyKey,
	);
