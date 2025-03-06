/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';

import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';

import { selectActiveNodeId } from '@/redux/features/ui/flow';
import exploreNodePrerequisites from '@/redux/utilities/exploreNodePrerequisites';

export const selectClickedNode = createSelector(
	[selectActiveNodeId, (state: RootState) => state.nodes.entities],
	(activeNodeId, nodeEntities): Node | undefined =>
		activeNodeId !== undefined
			? (nodeEntities[activeNodeId] ?? undefined)
			: undefined,
);

export const selectClickedNodeParents = createSelector(
	[selectClickedNode, (state: RootState) => state.nodes.entities],
	(clickedNode, nodeEntities): Node[] => {
		if (clickedNode === undefined) return [];

		const clickedNodeParents = exploreNodePrerequisites({
			node: clickedNode,
			nodeEntities,
		});

		return clickedNodeParents;
	},
);
