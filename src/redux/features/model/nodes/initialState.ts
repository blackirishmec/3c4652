import type { NodessState } from './types';

import { nodesAdapter } from './nodesAdapter';

export const initialState: NodessState = nodesAdapter.getInitialState();
