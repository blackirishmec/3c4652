import { createAction } from '@reduxjs/toolkit';

import type { Nodes } from '../../../../interfaces/db_models/nodesModels';

export const nodeFetched = createAction<Nodes>('nodes/nodesFetched');
export const nodesFetched = createAction<Nodes[]>('nodes/nodesFetched');
