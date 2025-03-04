import type { AppNode } from './types';
import type { NodeTypes } from '@xyflow/react';

import FormNode from './FormNode';
import { PositionLoggerNode } from './PositionLoggerNode';

export const initialNodes: AppNode[] = [
	{
		id: 'a',
		type: 'input',
		position: { x: 0, y: 0 },
		data: { label: 'wire' },
	},
	{
		id: 'b',
		type: 'position-logger',
		position: { x: -100, y: 100 },
		data: { label: 'drag me!' },
	},
	{ id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
	{
		id: 'd',
		type: 'output',
		position: { x: 0, y: 200 },
		data: { label: 'with React Flow' },
	},
];

export const nodeTypes = {
	'position-logger': PositionLoggerNode,
	form: FormNode,
	// Add any of your custom nodes here!
} satisfies NodeTypes;
