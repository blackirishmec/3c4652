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
	AvantosFieldSchemaPropertiesArray,
} from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import { selectClickedNodeId } from '@/redux/features/ui/flow';

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

export const selectFormByClickedNode = createSelector(
	[
		selectClickedNodeId,
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

export const selectClickedFormUiSchema = createSelector(
	[selectFormByClickedNode],
	(formByClickedNode): AvantosFormUiSchema | undefined => {
		if (formByClickedNode === undefined) return undefined;

		return formByClickedNode.ui_schema;
	},
);

export const selectClickedFormUiSchemaElements = createSelector(
	[selectFormByClickedNode],
	(formByClickedNode): AvantosUISchemaElement[] => {
		if (formByClickedNode === undefined) return [];

		return formByClickedNode.ui_schema.elements;
	},
);

export const selectClickedFormFieldSchema = createSelector(
	[selectFormByClickedNode],
	(formByClickedNode): AvantosFieldSchema | undefined => {
		if (formByClickedNode === undefined) return undefined;

		return formByClickedNode.field_schema;
	},
);

export const createSelectNodeFormFieldSchema = (nodeId: Node['id']) => {
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

export const selectClickedFormFieldSchemaProperties = createSelector(
	[selectFormByClickedNode],
	(formByClickedNode): AvantosFieldSchemaProperties => {
		if (formByClickedNode === undefined) return {};

		return formByClickedNode.field_schema.properties;
	},
);

export const createSelectNodeFormFieldSchemaProperties = (
	nodeId: Node['id'],
) => {
	const selectNodeFormFieldSchema = createSelectNodeFormFieldSchema(nodeId);

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

export const selectClickedFormFieldSchemaPropertiesArray = createSelector(
	[selectClickedFormFieldSchemaProperties],
	(clickedFormFieldSchemaProperties): AvantosFieldSchemaPropertiesArray =>
		Object.entries(
			clickedFormFieldSchemaProperties,
		).reduce<AvantosFieldSchemaPropertiesArray>((acc, [propertyId]) => {
			const property = clickedFormFieldSchemaProperties[propertyId];

			if (property !== undefined)
				acc.push({ ...property, key: propertyId });

			return acc;
		}, []),
);

export const createSelectNodeFormFieldSchemaPropertiesArray = (
	nodeId: Node['id'],
) => {
	const selectNodeFormFieldSchemaProperties =
		createSelectNodeFormFieldSchemaProperties(nodeId);

	return createSelector(
		[selectNodeFormFieldSchemaProperties],
		(nodeFormFieldSchemaProperties): AvantosFieldSchemaPropertiesArray =>
			Object.entries(
				nodeFormFieldSchemaProperties,
			).reduce<AvantosFieldSchemaPropertiesArray>((acc, [propertyId]) => {
				const property = nodeFormFieldSchemaProperties[propertyId];

				if (property !== undefined)
					acc.push({ ...property, key: propertyId });

				return acc;
			}, []),
	);
};
