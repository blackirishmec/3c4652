import type { NodeData } from '@/interfaces/AvantosInterfaces';
import type { NodeType } from '@/types/AvantosTypes';
import type { Node as DefaultNode } from '@xyflow/react';

export interface Node extends DefaultNode<NodeData, NodeType> {
	discriminant: 'Node';
}
