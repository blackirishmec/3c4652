import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Nodes } from '../../../../interfaces/db_models/nodesModels';

export const nodesAdapter = createEntityAdapter<Nodes, number>({
	selectId: nodes => nodes.id,
	sortComparer: false,
});
