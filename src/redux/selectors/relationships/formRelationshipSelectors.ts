import { createSelector } from '@reduxjs/toolkit';

import type {
	AvantosFieldSchema,
	AvantosFormUiSchema,
	AvantosUISchemaElement,
} from '@/interfaces/AvantosInterfaces';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type {
	AvantosFieldSchemaProperties,
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

export const selectFormUiSchemaByActiveNode = createSelector(
	[selectFormByActiveNode],
	(formByClickedNode): AvantosFormUiSchema | undefined => {
		if (formByClickedNode === undefined) return undefined;

		return formByClickedNode.ui_schema;
	},
);

export const selectFormUISchemaElementsByActiveNode = createSelector(
	[selectFormUiSchemaByActiveNode],
	(clickedFormUiSchema): AvantosUISchemaElement[] => {
		if (clickedFormUiSchema === undefined) return [];

		return clickedFormUiSchema.elements;
	},
);

export const selectFormFieldSchemaByActiveNode = createSelector(
	[selectFormByActiveNode],
	(formByClickedNode): AvantosFieldSchema | undefined => {
		if (formByClickedNode === undefined) return undefined;

		return formByClickedNode.field_schema;
	},
);

export const createSelectFormFieldSchemaByNode = (nodeId: Node['id']) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);
	const selectFormByNode = createSelectFormByNode(nodeId);

	return createSelector(
		[selectNode, selectFormByNode],
		(node, formByNode): AvantosFieldSchema | undefined => {
			if (node === undefined || formByNode === undefined) {
				return undefined;
			}

			return formByNode.field_schema;
		},
	);
};

export const selectFormFieldSchemaPropertiesByActiveNode = createSelector(
	[selectFormFieldSchemaByActiveNode],
	(formFieldSchemaByActiveNode): AvantosFieldSchemaProperties => {
		if (formFieldSchemaByActiveNode === undefined) return {};

		return formFieldSchemaByActiveNode.properties;
	},
);

export const createFormFieldSchemaPropertiesByNode = (nodeId: Node['id']) => {
	const selectNodeFormFieldSchema = createSelectFormFieldSchemaByNode(nodeId);

	return createSelector(
		[selectNodeFormFieldSchema],
		(nodeFormFieldSchema): AvantosFieldSchemaProperties => {
			if (nodeFormFieldSchema === undefined) {
				return {};
			}

			return nodeFormFieldSchema.properties;
		},
	);
};

export const selectFormFieldSchemaPropertiesArrayByActiveNode = createSelector(
	[selectFormFieldSchemaPropertiesByActiveNode],
	(clickedFormFieldSchemaProperties): FormFieldSchemaPropertiesArray =>
		Object.entries(
			clickedFormFieldSchemaProperties,
		).reduce<FormFieldSchemaPropertiesArray>((acc, [propertyId]) => {
			const property = clickedFormFieldSchemaProperties[propertyId];

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
