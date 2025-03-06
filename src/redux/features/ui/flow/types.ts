import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { StatusState } from '@/types/StatusTypes';
import type { Node } from '@xyflow/react';

export interface FlowState {
	fetchFlowDataStatus: StatusState;
	lastFetchFlowData: string | null;
	activeNodeId?: Node['id'];
	nodeFormFieldMappings: NodeFormFieldMapping[];
	activeNodeFormFieldPropertyKey?: AvantosFieldSchemaPropertiesArrayValue['key'];
	activeNodeFormFieldMappedPropertyKey?: NodeFormFieldMapping;
}
