import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { StatusState } from '@/types/StatusTypes';
import type { Node } from '@xyflow/react';

export interface FlowState {
	fetchFlowDataStatus: StatusState;
	lastFetchFlowData: string | null;
	activeNodeId?: Node['id'];
	nodeFormFieldMappings: NodeFormFieldMapping[];
	activeNodeFormFieldPropertyKey?: FormFieldSchemaPropertiesArrayValue['key'];
	activeNodeFormFieldMappedPropertyKey?: NodeFormFieldMapping;
}
