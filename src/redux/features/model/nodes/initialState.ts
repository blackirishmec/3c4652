import { nodessAdapter } from './nodessAdapter';
import { NodessState } from './types';

export const initialState: NodessState = nodessAdapter.getInitialState();