import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { StatusState } from '@/types/StatusTypes';
import type { Node } from '@xyflow/react';

export interface FlowState {
	fetchFlowDataStatus: StatusState;
	lastFetchFlowData: string | null;
	nodeFormFieldMappings: NodeFormFieldMapping[];
	activeNodeId?: Node['id'];
	activeNodeFormFieldPropertyKey?: FormFieldSchemaPropertiesArrayValue['key'];
	activePrefillingNodeId?: Node['id'];
	activePrefillingNodeFormFieldSchemaPropertyKey?: FormFieldSchemaPropertiesArrayValue['key'];
	availableDataSearchTerm?: string;
}
