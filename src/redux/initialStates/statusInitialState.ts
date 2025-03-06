import type { StatusState } from '@/types/StatusTypes';

const statusInitialState: StatusState = {
	loading: 'idle',
	error: null,
};

export default statusInitialState;
