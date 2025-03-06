import type { Edge } from '@/interfaces/models/edgeModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { StatusState } from '@/types/StatusTypes';

export interface FlowState {
	fetchFlowStatus: StatusState;
	lastFetchFlow?: Date;
	nodes: Node[];
	edges: Edge[];
}
