/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';

import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';

import { selectClickedNodeId } from '@/redux/features/ui/flow';

export const selectClickedNode = createSelector(
	[selectClickedNodeId, (state: RootState) => state.nodes.entities],
	(clickedNodeId, nodeEntities): Node | undefined =>
		clickedNodeId !== undefined
			? (nodeEntities[clickedNodeId] ?? undefined)
			: undefined,
);

export const selectClickedNodeParents = createSelector(
	[
		selectClickedNode,
		(state: RootState) => state.nodes.entities,
		(state: RootState) => state.edges.entities,
	],
	(clickedNode, nodeEntities, edgeEntities): Node[] => {
		if (clickedNode === undefined) return [];

		const clickedNodeParents: Node[] = [];

		// TODO:  Recursively explore clickedNode.data.prerequisites to get nodes which have ids in clickedNode.data.prerequisites and add them to the clickedNodeParents array (unique values in this array only!). Then recursively explore those added clickedNodeParents in the same manner.

		return clickedNodeParents;
	},
);
