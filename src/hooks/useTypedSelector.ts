import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';
import type { TypedUseSelectorHook } from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
