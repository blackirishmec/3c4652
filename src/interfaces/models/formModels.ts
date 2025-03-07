import type {
	FormField,
	FormFieldSchema,
	FormUiSchema,
} from '@/interfaces/AvantosInterfaces';

export interface Form {
	$schema?: string;
	custom_javascript?: string;
	description: string;
	dynamic_field_config: Record<string, FormField>;
	field_schema: FormFieldSchema;
	id: string;
	is_reusable: boolean;
	name: string;
	ui_schema: FormUiSchema;
}
