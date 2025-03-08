import type { EdgeTypes, NodeTypes } from '@xyflow/react';

import { FormNode } from '@/components/react-flow/nodes/FormNode';

export type NodeType = 'form' | 'branch' | 'trigger' | 'configuration';

export type PayloadField = {
	type: string;
	value: string;
};

export const nodeTypes = {
	form: FormNode,
} satisfies NodeTypes;

export const edgeTypes = {} satisfies EdgeTypes;
