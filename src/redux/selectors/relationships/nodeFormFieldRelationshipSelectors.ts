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
} from '@/redux/features/ui/flow/selectors';
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

export const selectSavedNodeFormFieldMappingsByActiveNode = createSelector(
	[selectActiveNode, selectNodeFormFieldMappings],
	(activeNode, nodeFormFieldMappings): NodeFormFieldMapping[] => {
		if (activeNode === undefined) return [];

		return nodeFormFieldMappings.filter(nodeFormField => {
			return nodeFormField.nodeId === activeNode.id;
		});
	},
);

export const createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey = (
	formFieldSchemaPropertyKey: FormFieldSchemaPropertiesArrayValue['key'],
) => {
	return createSelector(
		[selectSavedNodeFormFieldMappingsByActiveNode],
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
}: {
	nodeId: Node['id'];
	nodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
}) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);

	return createSelector(
		[selectNode, selectNodeFormFieldMappings],
		(node, nodeFormFieldMappings): NodeFormFieldMapping | undefined => {
			if (node === undefined) return undefined;

			return nodeFormFieldMappings.find(nodeFormFieldMapping => {
				return (
					node.id === nodeFormFieldMapping.nodeId &&
					nodeFormFieldPropertyKey ===
						nodeFormFieldMapping.nodeFormFieldSchemaPropertyKey
				);
			});
		},
	);
};

export const createSelectSavedNodeFormFieldMappingByNodeAndPropertyKey = ({
	nodeId,
	nodeFormFieldPropertyKey,
}: {
	nodeId: Node['id'];
	nodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
}) => {
	const selectNode = (state: RootState) => selectNodeById(state, nodeId);

	return createSelector(
		[selectNode, selectNodeFormFieldMappings],
		(node, nodeFormFieldMappings): NodeFormFieldMapping | undefined => {
			if (node === undefined) return undefined;

			return nodeFormFieldMappings.find(nodeFormFieldMapping => {
				return (
					node.id === nodeFormFieldMapping.nodeId &&
					nodeFormFieldPropertyKey ===
						nodeFormFieldMapping.nodeFormFieldSchemaPropertyKey
				);
			});
		},
	);
};

export const selectSavedNodeFormFieldMappingByActiveNode = createSelector(
	[
		selectActiveNode,
		selectActiveNodeFormFieldPropertyKey,
		selectNodeFormFieldMappings,
	],
	(
		activeNode,
		activeNodeFormFieldPropertyKey,
		savedNodeFormFieldMappings,
	): NodeFormFieldMapping | undefined => {
		if (activeNode === undefined) return undefined;

		return savedNodeFormFieldMappings.find(nodeFormFieldMapping => {
			return (
				activeNode.id === nodeFormFieldMapping.nodeId &&
				activeNodeFormFieldPropertyKey ===
					nodeFormFieldMapping.nodeFormFieldSchemaPropertyKey
			);
		});
	},
);

export const createSelectPrefillingNodeLabelByNodeAndPropertyKey = ({
	nodeId,
	nodeFormFieldPropertyKey,
}: {
	nodeId: Node['id'];
	nodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
}) => {
	const selectSavedNodeFormFieldMappingByNodeAndPropertyKey =
		createSelectSavedNodeFormFieldMappingByNodeAndPropertyKey({
			nodeId,
			nodeFormFieldPropertyKey,
		});

	return createSelector(
		[
			selectSavedNodeFormFieldMappingByNodeAndPropertyKey,
			(state: RootState) => state.nodes.entities,
			selectActivePrefillingNode,
		],
		(
			savedNodeFormFieldMappingByNodeAndPropertyKey,
			nodeEntities,
			activePrefillingNode,
		): string | undefined => {
			if (activePrefillingNode !== undefined) {
				return activePrefillingNode.data.name;
			}

			if (savedNodeFormFieldMappingByNodeAndPropertyKey === undefined) {
				return undefined;
			}

			const prefillingNode =
				nodeEntities[
					savedNodeFormFieldMappingByNodeAndPropertyKey?.prefillingNodeId ??
						''
				];

			if (prefillingNode === undefined) {
				return undefined;
			}

			return prefillingNode.data.name;
		},
	);
};

export const createSelectPrefillingNodeLabelByActiveNodeAndPropertyKey = ({
	nodeFormFieldPropertyKey,
}: {
	nodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
}) => {
	const selectSavedNodeFormFieldMappingByActiveNodeAndPropertyKey =
		createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey(
			nodeFormFieldPropertyKey,
		);

	return createSelector(
		[
			selectSavedNodeFormFieldMappingByActiveNodeAndPropertyKey,
			(state: RootState) => state.nodes.entities,
			selectActivePrefillingNode,
		],
		(
			savedNodeFormFieldMappingByActiveNodeAndPropertyKey,
			nodeEntities,
			activePrefillingNode,
		): string | undefined => {
			if (activePrefillingNode !== undefined) {
				return activePrefillingNode.data.name;
			}

			if (
				savedNodeFormFieldMappingByActiveNodeAndPropertyKey ===
				undefined
			) {
				return undefined;
			}

			const prefillingNode =
				nodeEntities[
					savedNodeFormFieldMappingByActiveNodeAndPropertyKey?.prefillingNodeId ??
						''
				];

			if (prefillingNode === undefined) {
				return undefined;
			}

			return prefillingNode.data.name;
		},
	);
};

export const selectPrefillingNodeByActiveNode = createSelector(
	[
		selectSavedNodeFormFieldMappingByActiveNode,
		(state: RootState) => state.nodes.entities,
		selectActivePrefillingNode,
	],
	(
		savedNodeFormFieldMappingByActiveNode,
		nodeEntities,
		activePrefillingNode,
	): Node | undefined => {
		if (activePrefillingNode !== undefined) {
			return activePrefillingNode;
		}

		if (savedNodeFormFieldMappingByActiveNode === undefined) {
			return undefined;
		}

		const prefillingNode =
			nodeEntities[
				savedNodeFormFieldMappingByActiveNode?.prefillingNodeId ?? ''
			];

		if (prefillingNode === undefined) {
			return undefined;
		}

		return prefillingNode;
	},
);

export const selectPrefillingNodeLabelByActiveNode = createSelector(
	[selectPrefillingNodeByActiveNode],
	(prefillingNodeByActiveNode): string | undefined => {
		if (prefillingNodeByActiveNode === undefined) return undefined;

		return prefillingNodeByActiveNode.data.name;
	},
);

export const createSelectPrefillingPropertyKeyLabelByActiveNodeAndPropertyKey =
	({
		nodeFormFieldPropertyKey,
	}: {
		nodeFormFieldPropertyKey: FormFieldSchemaPropertiesArrayValue['key'];
	}) => {
		const selectSavedNodeFormFieldMappingByActiveNodeAndPropertyKey =
			createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey(
				nodeFormFieldPropertyKey,
			);

		return createSelector(
			[
				selectSavedNodeFormFieldMappingByActiveNodeAndPropertyKey,
				selectActivePrefillingNodeFormFieldSchemaPropertyKey,
			],
			(
				savedNodeFormFieldMappingByActiveNodeAndPropertyKey,
				activePrefillingNodeFormFieldSchemaPropertyKey,
			): string | undefined => {
				if (
					activePrefillingNodeFormFieldSchemaPropertyKey !== undefined
				) {
					return activePrefillingNodeFormFieldSchemaPropertyKey;
				}

				if (
					savedNodeFormFieldMappingByActiveNodeAndPropertyKey ===
					undefined
				) {
					return undefined;
				}

				return savedNodeFormFieldMappingByActiveNodeAndPropertyKey?.prefillingNodeFormFieldSchemaPropertyKey;
			},
		);
	};

export const selectPrefillingPropertyKeyByActiveNode = createSelector(
	[
		selectSavedNodeFormFieldMappingByActiveNode,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	],
	(
		savedNodeFormFieldMappingByActiveNode,
		activePrefillingNodeFormFieldSchemaPropertyKey,
	): string | undefined => {
		if (activePrefillingNodeFormFieldSchemaPropertyKey !== undefined) {
			return activePrefillingNodeFormFieldSchemaPropertyKey;
		}

		if (savedNodeFormFieldMappingByActiveNode === undefined) {
			return undefined;
		}

		return savedNodeFormFieldMappingByActiveNode?.prefillingNodeFormFieldSchemaPropertyKey;
	},
);

export const selectNodeFormFieldMappingByActiveNode = createSelector(
	[
		selectSavedNodeFormFieldMappingsByActiveNode,
		selectActiveNodeFormFieldPropertyKey,
		selectActivePrefillingNode,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	],
	(
		savedNodeFormFieldMappingsByActiveNode,
		activeNodeFormFieldPropertyKey,
		activePrefillingNode,
		activePrefillingNodeFormFieldSchemaPropertyKey,
	): NodeFormFieldMapping | undefined => {
		if (
			savedNodeFormFieldMappingsByActiveNode.length === 0 ||
			activeNodeFormFieldPropertyKey === undefined ||
			activePrefillingNode === undefined ||
			activePrefillingNodeFormFieldSchemaPropertyKey === undefined
		)
			return undefined;

		return savedNodeFormFieldMappingsByActiveNode.find(
			savedNodeFormFieldMappingByActiveNode => {
				return (
					savedNodeFormFieldMappingByActiveNode.nodeFormFieldSchemaPropertyKey ===
						activeNodeFormFieldPropertyKey &&
					savedNodeFormFieldMappingByActiveNode.prefillingNodeId ===
						activePrefillingNode.id &&
					savedNodeFormFieldMappingByActiveNode.prefillingNodeFormFieldSchemaPropertyKey ===
						activePrefillingNodeFormFieldSchemaPropertyKey
				);
			},
		);
	},
);

export const selectPrefillMappingModalPrefillingNodeName = createSelector(
	[
		(state: RootState) => state.nodes.entities,
		selectNodeFormFieldMappingByActiveNode,
		selectActivePrefillingNode,
	],
	(
		nodeEntities,
		nodeFormFieldMappingByActiveNode,
		activePrefillingNode,
	): string | undefined => {
		if (activePrefillingNode !== undefined) {
			return activePrefillingNode.data.name;
		}

		const savedPrefillingNode =
			nodeEntities[
				nodeFormFieldMappingByActiveNode?.prefillingNodeId ?? ''
			];

		if (savedPrefillingNode !== undefined) {
			return savedPrefillingNode.data.name;
		}

		return undefined;
	},
);

export const selectPrefillMappingModalPrefillingPropertyKey = createSelector(
	[
		selectNodeFormFieldMappingByActiveNode,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	],
	(
		nodeFormFieldMappingByActiveNode,
		activePrefillingNodeFormFieldSchemaPropertyKey,
	): string | undefined => {
		if (activePrefillingNodeFormFieldSchemaPropertyKey !== undefined) {
			return activePrefillingNodeFormFieldSchemaPropertyKey;
		}

		if (nodeFormFieldMappingByActiveNode !== undefined) {
			return nodeFormFieldMappingByActiveNode.prefillingNodeFormFieldSchemaPropertyKey;
		}

		return undefined;
	},
);
