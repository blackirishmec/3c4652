import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

import createStatusSelectors from '@/redux/utilities/createStatusSelectors';

export const selectFlowState = (state: RootState) => state.flow;

export const fetchFlowStatusSelectors = createStatusSelectors(
	'fetchFlow',
	(state: RootState) => state.flow.fetchFlowDataStatus,
);

export const selectFlowDataLoaded = createSelector(
	[selectFlowState],
	flow => flow.lastFetchFlowData !== undefined,
);

export const selectFlowDataIsLoading = createSelector(
	[selectFlowState],
	flow => flow.fetchFlowDataStatus.loading === 'loading',
);

export const selectLastFetchFlowData = createSelector(
	[selectFlowState],
	flow => flow.lastFetchFlowData,
);

export const selectNodeFormFieldMappings = createSelector(
	[selectFlowState],
	flow => flow.nodeFormFieldMappings,
);

export const selectActiveNodeId = createSelector(
	[selectFlowState],
	flow => flow.activeNodeId,
);
export const selectActiveNodeFormFieldPropertyKey = createSelector(
	[selectFlowState],
	flow => flow.activeNodeFormFieldPropertyKey,
);

export const selectActivePrefillingNodeId = createSelector(
	[selectFlowState],
	flow => flow.activePrefillingNodeId,
);

export const selectActivePrefillingNodeFormFieldSchemaPropertyKey =
	createSelector(
		[selectFlowState],
		flow => flow.activePrefillingNodeFormFieldSchemaPropertyKey,
	);

export const selectAvailableDataSearchTerm = createSelector(
	[selectFlowState],
	flow => flow.availableDataSearchTerm,
);

export const selectActivePrefillingGlobalDataSubsetKey = createSelector(
	[selectFlowState],
	flow => flow.activePrefillingGlobalDataSubsetId,
);

export const selectActivePrefillingGlobalDataSubsetDataKey = createSelector(
	[selectFlowState],
	flow => flow.activePrefillingGlobalDataSubsetDataKey,
);

export const selectActivePrefillingParentIdentifier = createSelector(
	[selectFlowState],
	flow => flow.activePrefillingParentIdentifier,
);

export const selectActivePrefillingChildIdentifier = createSelector(
	[selectFlowState],
	flow => flow.activePrefillingChildIdentifier,
);

export const selectActivePrefillingModelType = createSelector(
	[selectFlowState],
	flow => flow.activePrefillingModelType,
);
