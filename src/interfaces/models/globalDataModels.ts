import type { FormFieldSchemaProperty } from '@/interfaces/AvantosInterfaces';

export interface GlobalDataSubsetData {
	key: string;
	property?: Partial<FormFieldSchemaProperty>;
}

export interface GlobalDataSubset {
	id: string;
	subsetData: GlobalDataSubsetData[];
}
