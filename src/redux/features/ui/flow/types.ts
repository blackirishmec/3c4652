import type { StatusState } from '@/types/StatusTypes';

export interface FlowState {
	fetchFlowStatus: StatusState;
	lastFetchFlow: string | null;
}
