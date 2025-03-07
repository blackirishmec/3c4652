import { createAction } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';

export const newNodeFormFieldMappingCreated =
	createAction<NodeFormFieldMapping>('flow/newNodeFormFieldMappingCreated');

export const existingNodeFormFieldMappingUpdated =
	createAction<NodeFormFieldMapping>(
		'flow/existingNodeFormFieldMappingUpdated',
	);
