import type { RootState } from '../../../store';

import nodesAdapter from '@/redux/features/model/nodes/nodesAdapter';

const selectNodesState = (state: RootState) => state.nodes;

export const {
	selectAll: selectAllNodes,
	selectById: selectNodesById,
	selectIds: selectNodesIds,
} = nodesAdapter.getSelectors(selectNodesState);
