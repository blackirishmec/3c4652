import type { NodeTypes } from '@xyflow/react';

import { default as FormNode } from './FormNode';

export const nodeTypes = {
	form: FormNode,
} satisfies NodeTypes;
