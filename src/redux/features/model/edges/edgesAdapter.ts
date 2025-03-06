import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Edge } from '@/interfaces/models/edgeModels';

const edgesAdapter = createEntityAdapter<Edge, Edge['id']>({
	selectId: edges => edges.id,
	sortComparer: false,
});

export default edgesAdapter;
