import type { FormFieldSchemaProperty } from '@/interfaces/AvantosInterfaces';
import type { EdgeTypes, NodeTypes } from '@xyflow/react';

import { FormNode } from '@/components/react-flow/nodes/FormNode';

export type AvantosNodeType = 'form' | 'branch' | 'trigger' | 'configuration';

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

export type FormFieldSchemaProperties = Record<string, FormFieldSchemaProperty>;

export type FormFieldSchemaPropertiesArrayValue = FormFieldSchemaProperty & {
	key: string;
};

export type FormFieldSchemaPropertiesArray =
	FormFieldSchemaPropertiesArrayValue[];
