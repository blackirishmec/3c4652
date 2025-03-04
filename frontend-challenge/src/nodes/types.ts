import type { Node } from '@xyflow/react';

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
}

export type AvantosNodeType = 'form' | 'branch' | 'trigger' | 'configuration';

export type AvantosNode = Node<AvantosNodeData, AvantosNodeType>;
