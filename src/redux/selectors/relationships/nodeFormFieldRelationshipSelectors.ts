import { createSelector } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import {
	selectActiveNodeFormFieldMappedPropertyKey,
	selectNodeFormFieldMappings,
} from '@/redux/features/ui/flow';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

export const createSelectNodeFormFields = (nodeId: Node['id']) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);

	return createSelector(
		[selectNode, selectNodeFormFieldMappings],
		(node, nodeFormFieldMappings): NodeFormFieldMapping[] => {
			if (node === undefined) return [];

			return nodeFormFieldMappings.filter(nodeFormField => {
				return nodeFormField.nodeId === node.id;
			});
		},
	);
};

export const selectClickedNodeFormFields = createSelector(
	[selectClickedNode, selectNodeFormFieldMappings],
	(clickedNode, nodeFormFieldMappings): NodeFormFieldMapping[] => {
		if (clickedNode === undefined) return [];

		return nodeFormFieldMappings.filter(nodeFormField => {
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
		[selectNode, selectNodeFormFieldMappings],
		(node, nodeFormFieldMappings): NodeFormFieldMapping | undefined => {
			if (node === undefined) return undefined;

			return nodeFormFieldMappings.find(nodeFormField => {
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
		[selectClickedNode, selectNodeFormFieldMappings],
		(
			clickedNode,
			nodeFormFieldMappings,
		): NodeFormFieldMapping | undefined => {
			if (clickedNode === undefined) return undefined;

			return nodeFormFieldMappings.find(nodeFormField => {
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
		selectActiveNodeFormFieldMappedPropertyKey,
		(state: RootState) => state.nodes.entities,
	],
	(
		clickedNodeFormFields,
		activeNodeFormFieldMappedPropertyKey,
		nodeEntities,
	): Node | undefined => {
		if (
			clickedNodeFormFields === undefined &&
			activeNodeFormFieldMappedPropertyKey === undefined
		)
			return undefined;

		clickedNodeFormFields;

		const prefillingNode =
			nodeEntities[
				activeNodeFormFieldMappedPropertyKey?.prefillingNodeId ?? ''
			];

		return prefillingNode;
	},
);
