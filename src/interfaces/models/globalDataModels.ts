import type { FormFieldSchemaProperty } from '@/interfaces/AvantosInterfaces';

export interface GlobalDataSubsetData {
	key: string;
	property?: Partial<FormFieldSchemaProperty>;
}

export interface GlobalDataSubset {
	key: string;
	subsetData: GlobalDataSubsetData[];
}
