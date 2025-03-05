import type { AvantosNodeData } from '@/interfaces/AvantosInterfaces';
import type { AvantosNodeType } from '@/types/AvantosTypes';
import type { Node as DefaultNode } from '@xyflow/react';

export interface Node extends DefaultNode<AvantosNodeData, AvantosNodeType> {}
