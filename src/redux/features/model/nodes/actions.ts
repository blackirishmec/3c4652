import { createAction } from '@reduxjs/toolkit';

import type { Node } from '@/interfaces/models/nodeModels';

export const nodeFetched = createAction<Node>('nodes/nodeFetched');
export const nodesFetched = createAction<Node[]>('nodes/nodesFetched');
