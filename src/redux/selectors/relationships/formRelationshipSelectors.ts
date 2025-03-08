import { createSelector } from '@reduxjs/toolkit';

import type { FormFieldSchema } from '@/interfaces/AvantosInterfaces';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type {
	FormFieldSchemaProperties,
	FormFieldSchemaPropertiesArray,
} from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import { selectActiveNodeId } from '@/redux/features/ui/flow';

export const createSelectFormByNode = (nodeId: Node['id']) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);

	return createSelector(
		[
			selectNode,
			(state: RootState) => state.nodes.entities,
			(state: RootState) => state.forms.entities,
		],
		(node, nodeEntities, formEntities): Form | undefined => {
			if (node === undefined) return undefined;

			const clickedNode = nodeEntities[node.id];

			if (clickedNode === undefined) return undefined;

			return formEntities[clickedNode.data.component_id];
		},
	);
};

export const selectFormByActiveNode = createSelector(
	[
		selectActiveNodeId,
		(state: RootState) => state.nodes.entities,
		(state: RootState) => state.forms.entities,
	],
	(activeNodeId, nodeEntities, formEntities): Form | undefined => {
		if (activeNodeId === undefined) return undefined;

		const clickedNode = nodeEntities[activeNodeId];

		if (clickedNode === undefined) return undefined;

		return formEntities[clickedNode.data.component_id];
	},
);

export const selectFormFieldSchemaByActiveNode = createSelector(
	[selectFormByActiveNode],
	(formByActiveNode): FormFieldSchema | undefined => {
		if (formByActiveNode === undefined) return undefined;

		return formByActiveNode.field_schema;
	},
);

export const createSelectFormFieldSchemaByNode = (nodeId: Node['id']) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);
	const selectFormByNode = createSelectFormByNode(nodeId);

	return createSelector(
		[selectNode, selectFormByNode],
		(node, formByNode): FormFieldSchema | undefined => {
			if (node === undefined || formByNode === undefined) {
				return undefined;
			}

			return formByNode.field_schema;
		},
	);
};

export const selectFormFieldSchemaPropertiesByActiveNode = createSelector(
	[selectFormFieldSchemaByActiveNode],
	(formFieldSchemaByActiveNode): FormFieldSchemaProperties => {
		if (formFieldSchemaByActiveNode === undefined) return {};

		return formFieldSchemaByActiveNode.properties;
	},
);

export const createFormFieldSchemaPropertiesByNode = (nodeId: Node['id']) => {
	const selectNodeFormFieldSchema = createSelectFormFieldSchemaByNode(nodeId);

	return createSelector(
		[selectNodeFormFieldSchema],
		(nodeFormFieldSchema): FormFieldSchemaProperties => {
			if (nodeFormFieldSchema === undefined) {
				return {};
			}

			return nodeFormFieldSchema.properties;
		},
	);
};

export const selectFormFieldSchemaPropertiesArrayByActiveNode = createSelector(
	[selectFormFieldSchemaPropertiesByActiveNode],
	(formFieldSchemaPropertiesByActiveNode): FormFieldSchemaPropertiesArray =>
		Object.entries(
			formFieldSchemaPropertiesByActiveNode,
		).reduce<FormFieldSchemaPropertiesArray>((acc, [propertyId]) => {
			const property = formFieldSchemaPropertiesByActiveNode[propertyId];

			if (property !== undefined)
				acc.push({ ...property, key: propertyId });

			return acc;
		}, []),
);

export const createSelectFormFieldSchemaPropertiesArrayByNode = (
	nodeId: Node['id'],
) => {
	const selectNodeFormFieldSchemaProperties =
		createFormFieldSchemaPropertiesByNode(nodeId);

	return createSelector(
		[selectNodeFormFieldSchemaProperties],
		(nodeFormFieldSchemaProperties): FormFieldSchemaPropertiesArray =>
			Object.entries(
				nodeFormFieldSchemaProperties,
			).reduce<FormFieldSchemaPropertiesArray>((acc, [propertyId]) => {
				const property = nodeFormFieldSchemaProperties[propertyId];

				if (property !== undefined)
					acc.push({ ...property, key: propertyId });

				return acc;
			}, []),
	);
};
