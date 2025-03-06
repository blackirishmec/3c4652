import { createSelector } from '@reduxjs/toolkit';

import type {
	AvantosFieldSchema,
	AvantosFormUiSchema,
	AvantosUISchemaElement,
} from '@/interfaces/AvantosInterfaces';
import type { Form } from '@/interfaces/models/formModels';
import type { RootState } from '@/redux/store';
import type {
	AvantosFieldSchemaProperties,
	AvantosFieldSchemaPropertiesArray,
} from '@/types/AvantosTypes';

import { selectClickedNodeId } from '@/redux/features/ui/flow';

export const selectFormByClickedNode = createSelector(
	[
		selectClickedNodeId,
		(state: RootState) => state.nodes.entities,
		(state: RootState) => state.forms.entities,
	],
	(clickedNodeId, nodeEntities, formEntities): Form | undefined => {
		if (clickedNodeId === undefined) return undefined;

		const clickedNode = nodeEntities[clickedNodeId];

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

export const selectClickedFormFieldSchemaProperties = createSelector(
	[selectFormByClickedNode],
	(formByClickedNode): AvantosFieldSchemaProperties => {
		if (formByClickedNode === undefined) return {};

		return formByClickedNode.field_schema.properties;
	},
);

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
