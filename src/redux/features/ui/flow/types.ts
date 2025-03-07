import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { StatusState } from '@/types/StatusTypes';
import type { Node } from '@xyflow/react';

export type PrefillingModelType = 'Node' | 'GlobalDataSubset';

export interface FlowState {
	fetchFlowDataStatus: StatusState;
	lastFetchFlowData: string | null;
	nodeFormFieldMappings: NodeFormFieldMapping[];

	activeNodeId?: Node['id'];
	activeNodeFormFieldPropertyKey?: FormFieldSchemaPropertiesArrayValue['key'];

	availableDataSearchTerm?: string;

	activePrefillingNodeId?: Node['id'];
	activePrefillingNodeFormFieldSchemaPropertyKey?: FormFieldSchemaPropertiesArrayValue['key'];

	activePrefillingGlobalDataSubsetId?: GlobalDataSubset['id'];
	activePrefillingGlobalDataSubsetDataKey?: GlobalDataSubsetData['id'];

	activePrefillingParentIdentifier?: string;
	activePrefillingChildIdentifier?: string;

	activePrefillingModelType?: PrefillingModelType;
}
