/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import { selectNodeFormFields } from '@/redux/features/ui/flow';

export const createSelectNodeFormFields = (nodeId: Node['id']) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);

	return createSelector(
		[selectNode, selectNodeFormFields],
		(node, nodeFormFields): NodeFormField[] => {
			if (node === undefined) return [];

			return nodeFormFields.filter(nodeFormField => {
				return nodeFormField.nodeId === node.id;
			});
		},
	);
};

export const createSelectNodeFormField = (
	nodeId: Node['id'],
	nodeFormFieldSchemaPropertyKey: AvantosFieldSchemaPropertiesArrayValue['key'],
) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);

	return createSelector(
		[selectNode, selectNodeFormFields],
		(node, nodeFormFields): NodeFormField | undefined => {
			if (node === undefined) return undefined;

			return nodeFormFields.find(nodeFormField => {
				return (
					nodeFormField.nodeId === node.id &&
					nodeFormField.nodeFormFieldSchemaPropertyKey ===
						nodeFormFieldSchemaPropertyKey
				);
			});
		},
	);
};
