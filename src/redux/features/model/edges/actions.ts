import { createAction } from '@reduxjs/toolkit';

import type { Edge } from '@/interfaces/models/edgeModels';

export const edgeFetched = createAction<Edge>('edges/edgeFetched');
export const edgesFetched = createAction<Edge[]>('edges/edgesFetched');
