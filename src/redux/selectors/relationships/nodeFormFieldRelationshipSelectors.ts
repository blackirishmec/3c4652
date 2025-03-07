import { createSelector } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import {
	selectActiveNodeFormFieldPropertyKey,
	selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	selectNodeFormFieldMappings,
} from '@/redux/features/ui/flow';
import {
	selectActiveNode,
	selectActivePrefillingNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

export const createSelectNodeFormFieldMappingByNode = (nodeId: Node['id']) => {
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

export const selectNodeFormFieldMappingsByActiveNode = createSelector(
	[selectActiveNode, selectNodeFormFieldMappings],
	(activeNode, nodeFormFieldMappings): NodeFormFieldMapping[] => {
		if (activeNode === undefined) return [];

		return nodeFormFieldMappings.filter(nodeFormField => {
			return nodeFormField.nodeId === activeNode.id;
		});
	},
);

export const createSelectNodeFormFieldMappingByActiveNode = (
	formFieldSchemaPropertyKey: FormFieldSchemaPropertiesArrayValue['key'],
) => {
	return createSelector(
		[selectNodeFormFieldMappingsByActiveNode],
		(
			nodeFormFieldMappingsByActiveNode,
		): NodeFormFieldMapping | undefined => {
			if (nodeFormFieldMappingsByActiveNode.length === 0)
				return undefined;

			return nodeFormFieldMappingsByActiveNode.find(
				nodeFormFieldMappingByActiveNode => {
					return (
						nodeFormFieldMappingByActiveNode.nodeFormFieldSchemaPropertyKey ===
						formFieldSchemaPropertyKey
					);
				},
			);
		},
	);
};

export const createSelectNodeFormFieldMapping = ({
	nodeId,
	nodeFormFieldPropertyKey,
	prerequisiteNodeId,
	prerequisiteNodeFormFieldPropertyKey,
}: {
	nodeId: Node['id'];
	nodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
	prerequisiteNodeId: Node['id'];
	prerequisiteNodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
}) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);
	const selectPrerequisiteNode = (state: RootState) =>
		selectNodeById(state, prerequisiteNodeId);

	return createSelector(
		[selectNode, selectPrerequisiteNode, selectNodeFormFieldMappings],
		(
			node,
			prerequisiteNode,
			nodeFormFieldMappings,
		): NodeFormFieldMapping | undefined => {
			if (prerequisiteNode === undefined || node === undefined)
				return undefined;

			return nodeFormFieldMappings.find(nodeFormFieldMapping => {
				return (
					node.id === nodeFormFieldMapping.nodeId &&
					nodeFormFieldPropertyKey ===
						nodeFormFieldMapping.nodeFormFieldSchemaPropertyKey &&
					prerequisiteNodeFormFieldPropertyKey ===
						nodeFormFieldMapping.prefillingNodeFormFieldSchemaPropertyKey &&
					prerequisiteNode.id ===
						nodeFormFieldMapping.prefillingNodeId
				);
			});
		},
	);
};

export const selectNodeFormFieldMappingByActiveNode = createSelector(
	[
		selectNodeFormFieldMappingsByActiveNode,
		selectActiveNodeFormFieldPropertyKey,
		selectActivePrefillingNode,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	],
	(
		nodeFormFieldMappingsByActiveNode,
		activeNodeFormFieldPropertyKey,
		activePrefillingNode,
		activePrefillingNodeFormFieldSchemaPropertyKey,
	): NodeFormFieldMapping | undefined => {
		if (
			nodeFormFieldMappingsByActiveNode.length === 0 ||
			activeNodeFormFieldPropertyKey === undefined ||
			activePrefillingNode === undefined ||
			activePrefillingNodeFormFieldSchemaPropertyKey === undefined
		)
			return undefined;

		return nodeFormFieldMappingsByActiveNode.find(
			nodeFormFieldMappingByActiveNode => {
				return (
					nodeFormFieldMappingByActiveNode.nodeFormFieldSchemaPropertyKey ===
						activeNodeFormFieldPropertyKey &&
					nodeFormFieldMappingByActiveNode.prefillingNodeId ===
						activePrefillingNode.id &&
					nodeFormFieldMappingByActiveNode.prefillingNodeFormFieldSchemaPropertyKey ===
						activePrefillingNodeFormFieldSchemaPropertyKey
				);
			},
		);
	},
);
