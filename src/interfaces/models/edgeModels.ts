import type { Edge as DefaultEdge } from '@xyflow/react';

export interface Edge extends DefaultEdge {
	source: string;
	target: string;
}
