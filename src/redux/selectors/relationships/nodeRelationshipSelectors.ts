import { createSelector } from '@reduxjs/toolkit';

import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';

import {
	selectActiveNodeId,
	selectActivePrefillingNodeId,
} from '@/redux/features/ui/flow/selectors';
import exploreNodePrerequisites from '@/redux/utilities/exploreNodePrerequisites';

export const selectActiveNode = createSelector(
	[selectActiveNodeId, (state: RootState) => state.nodes.entities],
	(activeNodeId, nodeEntities): Node | undefined =>
		activeNodeId !== undefined
			? (nodeEntities[activeNodeId] ?? undefined)
			: undefined,
);

export const selectPrefillingEnabledByActiveNode = createSelector(
	[selectActiveNode],
	(activeNode): boolean =>
		activeNode !== undefined ? activeNode.data.prefill_enabled : false,
);

export const selectActivePrefillingNode = createSelector(
	[selectActivePrefillingNodeId, (state: RootState) => state.nodes.entities],
	(activePrefillingNodeId, nodeEntities): Node | undefined =>
		activePrefillingNodeId !== undefined
			? (nodeEntities[activePrefillingNodeId] ?? undefined)
			: undefined,
);

export const selectActiveNodePrerequisiteNodes = createSelector(
	[selectActiveNode, (state: RootState) => state.nodes.entities],
	(activeNode, nodeEntities): Node[] => {
		if (activeNode === undefined) return [];

		const clickedNodeParents = exploreNodePrerequisites({
			node: activeNode,
			nodeEntities,
		});

		return clickedNodeParents;
	},
);
