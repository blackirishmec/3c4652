import type {
	FormFieldSchemaProperties,
	FormFieldSchemaPropertiesArrayValue,
	NodeType,
	PayloadField,
} from '../types/AvantosTypes';
import type { Edge } from '@/interfaces/models/edgeModels';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { PrefillingModelType } from '@/redux/features/ui/flow';

export interface AvantosApiResponse {
	nodes: Node[];
	edges: Edge[];
	forms: Form[];
}

export interface NodeData extends Record<string, unknown> {
	approval_required: boolean;
	approval_roles: string[];
	component_id: string;
	component_key: string;
	component_type: NodeType;
	id: string;
	input_mapping: Record<string, object>;
	name: string;
	permitted_roles: string[] | null;
	prerequisites: string[] | null;
	sla_duration?: {
		number: number;
		unit: 'minutes' | 'hours' | 'days';
	};
	edge_to: boolean;
	edge_from: boolean;
	prefill_enabled: boolean;
}

export interface FormUiSchema {
	elements: FormUISchemaElement[];
	type: string;
}

export interface FormField {
	endpoint_id: string;
	output_key?: string;
	payload_fields: Record<string, PayloadField>;
	selector_field: string;
}

export interface FormFieldSchemaProperty {
	avantos_type: string;
	type: string;
	enum?: null;
	format?: string;
	items?: {
		enum: string[];
		type: string;
	};
	title?: string;
	uniqueItems?: boolean;
}

export interface FormFieldSchema {
	properties: FormFieldSchemaProperties;
	required: string[] | null;
	type: string;
}

export interface FormUISchemaElement {
	label: string;
	scope: string;
	type: string;
}

export interface NodeFormFieldMapping {
	nodeId: Node['id'];
	nodeFormFieldSchemaPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
	prefillingModelType: PrefillingModelType;
	prefillingParentIdentifier?: string;
	prefillingChildIdentifier: string;
}
