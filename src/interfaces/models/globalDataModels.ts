import type { FormFieldSchemaProperty } from '@/interfaces/AvantosInterfaces';

export interface GlobalDataSubsetData {
	id: string;
	property?: Partial<FormFieldSchemaProperty>;
}

export interface GlobalDataSubset {
	id: string;
	subsetData: GlobalDataSubsetData[];
	discriminant: 'GlobalDataSubset';
}
