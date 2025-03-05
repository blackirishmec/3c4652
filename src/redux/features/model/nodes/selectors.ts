import { createSelector } from '@reduxjs/toolkit';

import type { Nodes } from '../../../../interfaces/db_models/nodesModels';
import type { RootState } from '../../../store';

import { nodesAdapter } from './nodesAdapter';

const selectNodessState = (state: RootState) => state.nodes;

export const {
	selectAll: selectAllNodess,
	selectById: selectNodesById,
	selectIds: selectNodesIds,
} = nodesAdapter.getSelectors(selectNodessState);

export const selectNodesNamesById = createSelector([selectAllNodess], nodes =>
	nodes.reduce(
		(acc, nodes) => ({
			...acc,
			[nodes.id]: nodes.name,
		}),
		{} as Record<Nodes['id'], Nodes['name']>,
	),
);
