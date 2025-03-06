import type { StatusState } from '@/types/StatusTypes';
import type { Node } from '@xyflow/react';

export interface FlowState {
	fetchFlowStatus: StatusState;
	lastFetchFlow: string | null;
	clickedNodeId?: Node['id'];
}
