import type { NodesState } from './types';

import nodesAdapter from '@/redux/features/model/nodes/nodesAdapter';

const initialState: NodesState = nodesAdapter.getInitialState();

export default initialState;
