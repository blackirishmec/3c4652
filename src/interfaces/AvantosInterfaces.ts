import type {
	AvantosNodeType,
	AvantosPayloadField,
} from '../types/AvantosTypes';
import type { Edge } from '@/interfaces/models/edgeModels';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';

export interface AvantosApiResponse {
	nodes: Node[];
	edges: Edge[];
	forms: Form[];
}

export interface AvantosNodeData extends Record<string, unknown> {
	approval_required: boolean;
	approval_roles: string[];
	component_id: string;
	component_key: string;
	component_type: AvantosNodeType;
	id: string;
	input_mapping: Record<string, object>;
	name: string;
	permitted_roles: string[] | null;
	prerequisites: string[] | null;
	sla_duration?: {
		number: number;
		unit: 'minutes' | 'hours' | 'days';
	};
	edgeTo: boolean;
	edgeFrom: boolean;
}

export interface AvantosField {
	endpoint_id: string;
	output_key?: string;
	payload_fields: Record<string, AvantosPayloadField>;
	selector_field: string;
}

export interface AvantosFieldProperty {
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

export interface AvantosFieldSchema {
	properties: Record<string, AvantosFieldProperty>;
	required: string[] | null;
	type: string;
}

export interface AvantosUISchemaElement {
	label: string;
	scope: string;
	type: string;
}
