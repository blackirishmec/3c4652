/* eslint-disable import/prefer-default-export */

import { createSelector } from '@reduxjs/toolkit';

import type { Form } from '@/interfaces/models/formModels';
import type { RootState } from '@/redux/store';

import { selectClickedNodeId } from '@/redux/features/ui/flow';

export const selectFormByClickedNode = createSelector(
	[
		selectClickedNodeId,
		(state: RootState) => state.nodes.entities,
		(state: RootState) => state.forms.entities,
	],
	(clickedNodeId, nodeEntities, formEntities): Form | undefined => {
		if (clickedNodeId === undefined) return undefined;

		const clickedNode = nodeEntities[clickedNodeId];

		if (clickedNode === undefined) return undefined;

		return formEntities[clickedNode.data.component_id];
	},
);
