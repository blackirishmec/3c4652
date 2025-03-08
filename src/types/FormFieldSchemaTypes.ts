import type { FormFieldSchemaProperty } from '@/interfaces/AvantosInterfaces';

export type FormFieldSchemaProperties = Record<string, FormFieldSchemaProperty>;

export type FormFieldSchemaPropertiesArrayValue = FormFieldSchemaProperty & {
	key: string;
};

export type FormFieldSchemaPropertiesArray =
	FormFieldSchemaPropertiesArrayValue[];
