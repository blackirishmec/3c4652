import type { FormsState } from './types';

import formsAdapter from '@/redux/features/model/form/formsAdapter';

const initialState: FormsState = formsAdapter.getInitialState();

export default initialState;
