import { createSelector } from '@reduxjs/toolkit';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import {
	selectNodeFormFields,
	selectSelectedClickedNodeFormField,
} from '@/redux/features/ui/flow';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

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

export const selectClickedNodeFormFields = createSelector(
	[selectClickedNode, selectNodeFormFields],
	(clickedNode, nodeFormFields): NodeFormField[] => {
		if (clickedNode === undefined) return [];

		return nodeFormFields.filter(nodeFormField => {
			return nodeFormField.nodeId === clickedNode.id;
		});
	},
);

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

export const createSelectClickedNodeFormField = (
	nodeFormFieldSchemaPropertyKey: AvantosFieldSchemaPropertiesArrayValue['key'],
) => {
	return createSelector(
		[selectClickedNode, selectNodeFormFields],
		(clickedNode, nodeFormFields): NodeFormField | undefined => {
			if (clickedNode === undefined) return undefined;

			return nodeFormFields.find(nodeFormField => {
				return (
					nodeFormField.nodeId === clickedNode.id &&
					nodeFormField.nodeFormFieldSchemaPropertyKey ===
						nodeFormFieldSchemaPropertyKey
				);
			});
		},
	);
};

// TODO: {Thu, 03/06/25 @16:10} => Handle globals!
export const selectSelectedClickedNodeFormFieldPrefillingNode = createSelector(
	[
		selectClickedNodeFormFields,
		selectSelectedClickedNodeFormField,
		(state: RootState) => state.nodes.entities,
	],
	(
		clickedNodeFormFields,
		selectedClickedNodeFormField,
		nodeEntities,
	): Node | undefined => {
		if (
			clickedNodeFormFields === undefined &&
			selectedClickedNodeFormField === undefined
		)
			return undefined;

		clickedNodeFormFields;

		const prefillingNode =
			nodeEntities[selectedClickedNodeFormField?.prefillingNodeId ?? ''];

		return prefillingNode;
	},
);
