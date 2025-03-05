import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Node } from '@/interfaces/models/nodeModels';

const nodesAdapter = createEntityAdapter<Node, Node['id']>({
	selectId: nodes => nodes.id,
	sortComparer: false,
});

export default nodesAdapter;
