import type {
	AvantosField,
	FormFieldSchema,
	FormUiSchema,
} from '@/interfaces/AvantosInterfaces';

export interface Form {
	$schema?: string;
	custom_javascript?: string;
	description: string;
	dynamic_field_config: Record<string, AvantosField>;
	field_schema: FormFieldSchema;
	id: string;
	is_reusable: boolean;
	name: string;
	ui_schema: FormUiSchema;
}
