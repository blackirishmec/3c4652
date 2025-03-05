import { createEntityAdapter } from '@reduxjs/toolkit';
import { Nodes } from '../../../../interfaces/db_models/nodesModels';

export const nodessAdapter = createEntityAdapter<Nodes, number>({
    selectId: nodes => nodes.id,
    sortComparer: false,
});