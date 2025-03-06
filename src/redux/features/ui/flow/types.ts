import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { StatusState } from '@/types/StatusTypes';
import type { Node } from '@xyflow/react';

export interface FlowState {
	fetchFlowStatus: StatusState;
	lastFetchFlow: string | null;
	clickedNodeId?: Node['id'];
	nodeFormFields: NodeFormField[];
	selectedClickedNodeFormField?: NodeFormField;
	selectedClickedNodeFormFieldSchemaPropertyKey?: AvantosFieldSchemaPropertiesArrayValue['key'];
}
