import type {
	AvantosField,
	AvantosFieldSchema,
	AvantosUISchemaElement,
} from '@/interfaces/AvantosInterfaces';

export interface Form {
	$schema?: string;
	custom_javascript?: string;
	description: string;
	dynamic_field_config: Record<string, AvantosField>;
	field_schema: AvantosFieldSchema;
	id: string;
	is_reusable: boolean;
	name: string;
	ui_schema: {
		elements: AvantosUISchemaElement[];
		type: string;
	};
}
