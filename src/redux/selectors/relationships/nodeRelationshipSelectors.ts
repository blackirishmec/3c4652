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
