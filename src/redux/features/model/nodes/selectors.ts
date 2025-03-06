import type { RootState } from '../../../store';

import nodesAdapter from '@/redux/features/model/nodes/nodesAdapter';

const selectNodesState = (state: RootState) => state.nodes;

export const {
	selectAll: selectAllNodes,
	selectById: selectNodeById,
	selectIds: selectNodeIds,
} = nodesAdapter.getSelectors(selectNodesState);
