import type { RootState } from '../../../store';

import edgesAdapter from '@/redux/features/model/edges/edgesAdapter';

const selectEdgesState = (state: RootState) => state.edges;

export const {
	selectAll: selectAllEdges,
	selectById: selectEdgesById,
	selectIds: selectEdgesIds,
} = edgesAdapter.getSelectors(selectEdgesState);
