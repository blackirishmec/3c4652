import { createAction } from '@reduxjs/toolkit';
import { Nodes } from '../../../../interfaces/db_models/nodesModels';

export const nodesFetched = createAction<Nodes>('nodess/nodesFetched');
export const nodessFetched = createAction<Nodes[]>('nodess/nodessFetched');