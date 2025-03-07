import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';
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
	// Custom data sources will best live as separate redux features in prod:
	globalData: GlobalDataSubset[];
	activePrefillingGlobalDataSubsetKey?: GlobalDataSubset['key'];
	activePrefillingGlobalDataSubsetDataKey?: GlobalDataSubsetData['key'];
}
