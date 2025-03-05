import type { FormsState } from './types';

import formsAdapter from '@/redux/features/model/forms/formsAdapter';

const initialState: FormsState = formsAdapter.getInitialState();

export default initialState;
