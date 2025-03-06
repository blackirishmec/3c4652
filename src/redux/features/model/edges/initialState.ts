import type { EdgesState } from './types';

import edgesAdapter from '@/redux/features/model/edges/edgesAdapter';

const initialState: EdgesState = edgesAdapter.getInitialState();

export default initialState;
