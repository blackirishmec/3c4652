/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';

export const newNodeFormFieldMappingCreated =
	createAction<NodeFormFieldMapping>('flow/newNodeFormFieldMappingCreated');
