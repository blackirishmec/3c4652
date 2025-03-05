import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { nodessAdapter } from './nodessAdapter';
import { Nodes } from '../../../../interfaces/db_models/nodesModels';

const selectNodessState = (state: RootState) => state.nodess;

export const {
    selectAll: selectAllNodess,
    selectById: selectNodesById,
    selectIds: selectNodesIds,
} = nodessAdapter.getSelectors(selectNodessState);

export const selectNodesNamesById = createSelector(
    [selectAllNodess],
    nodess =>
        nodess.reduce(
            (acc, nodes) => ({
                ...acc,
                [nodes.id]: nodes.name,
            }),
            {} as Record<Nodes['id'], Nodes['name']>,
        ),
);