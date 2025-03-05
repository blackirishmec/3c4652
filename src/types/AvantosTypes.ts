import type { AvantosNodeData } from '../interfaces/AvantosInterfaces';
import type { EdgeTypes, Node, NodeTypes } from '@xyflow/react';

import { FormNode } from '../components/react-flow/nodes/FormNode';

export type AvantosNodeType = 'form' | 'branch' | 'trigger' | 'configuration';

export type AvantosNode = Node<AvantosNodeData, AvantosNodeType>;

export type AvantosPayloadField = {
	type: string;
	value: string;
};

export const nodeTypes = {
	form: FormNode,
} satisfies NodeTypes;

export const edgeTypes = {
	// Add your custom edge types here!
} satisfies EdgeTypes;
