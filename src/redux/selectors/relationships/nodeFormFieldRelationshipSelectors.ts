import { createSelector } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import {
	selectActiveNodeFormFieldPropertyKey,
	selectActivePrefillingChildIdentifier,
	selectActivePrefillingModelType,
	selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	selectActivePrefillingParentIdentifier,
	selectNodeFormFieldMappings,
} from '@/redux/features/ui/flow/selectors';
import { nodeFormFieldMappingsAreEqual } from '@/redux/features/ui/flow/utils';
import {
	selectActiveNode,
	selectActivePrefillingNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import isGlobalDataSubset from '@/utilities/type_guards/GlobalDataSubsetTypeGuards';
import isNode from '@/utilities/type_guards/NodeTypeGuards';

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
			savedNodeFormFieldMappingsByActiveNode,
		): NodeFormFieldMapping | undefined => {
			if (savedNodeFormFieldMappingsByActiveNode.length === 0)
				return undefined;

			return savedNodeFormFieldMappingsByActiveNode.find(
				savedNodeFormFieldMappingByActiveNode => {
					return (
						savedNodeFormFieldMappingByActiveNode.nodeFormFieldSchemaPropertyKey ===
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

export const selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey =
	createSelector(
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

export const selectSavedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier =
	createSelector(
		[
			selectActiveNode,
			selectActivePrefillingParentIdentifier,
			selectNodeFormFieldMappings,
		],
		(
			activeNode,
			activePrefillingParentIdentifier,
			savedNodeFormFieldMappings,
		): NodeFormFieldMapping | undefined => {
			if (activeNode === undefined) return undefined;

			return savedNodeFormFieldMappings.find(nodeFormFieldMapping => {
				return (
					activeNode.id === nodeFormFieldMapping.nodeId &&
					activePrefillingParentIdentifier ===
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
					savedNodeFormFieldMappingByNodeAndPropertyKey?.prefillingParentIdentifier ??
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
					savedNodeFormFieldMappingByActiveNodeAndPropertyKey?.prefillingParentIdentifier ??
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
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		(state: RootState) => state.nodes.entities,
		selectActivePrefillingNode,
	],
	(
		savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		nodeEntities,
		activePrefillingNode,
	): Node | undefined => {
		if (activePrefillingNode !== undefined) {
			return activePrefillingNode;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
			undefined
		) {
			return undefined;
		}

		const prefillingNode =
			nodeEntities[
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey?.prefillingParentIdentifier ??
					''
			];

		if (prefillingNode === undefined) {
			return undefined;
		}

		return prefillingNode;
	},
);

export const selectSavedPrefillingNodeByActiveNodeAndActivePropertyKey =
	createSelector(
		[
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
			(state: RootState) => state.nodes.entities,
		],
		(
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
			nodeEntities,
		): Node | undefined => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
				undefined
			) {
				return undefined;
			}

			const prefillingNode =
				nodeEntities[
					savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey.prefillingParentIdentifier ??
						''
				];

			if (prefillingNode === undefined) {
				return undefined;
			}

			return prefillingNode;
		},
	);

export const selectSavedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier =
	createSelector(
		[
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
			(state: RootState) => state.nodes.entities,
			(state: RootState) => state.globalDataSubsets.entities,
		],
		(
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
			nodeEntities,
			globalDataSubsetEntities,
		): Node | GlobalDataSubset | undefined => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier ===
				undefined
			) {
				return undefined;
			}

			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingModelType ===
				'Node'
			) {
				const prefillingNode =
					nodeEntities[
						savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingParentIdentifier ??
							''
					];

				if (prefillingNode === undefined) {
					return undefined;
				}

				return prefillingNode;
			}

			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingModelType ===
				'GlobalDataSubset'
			) {
				const prefillingGlobalDataSubset =
					globalDataSubsetEntities[
						savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingParentIdentifier ??
							''
					];

				if (prefillingGlobalDataSubset === undefined) {
					return undefined;
				}

				return prefillingGlobalDataSubset;
			}

			return undefined;
		},
	);

export const selectSavedPrefillingNodeFormFieldSchemaPropertyKeyByActiveNodeAndActivePropertyKey =
	createSelector(
		[selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey],
		(
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		): FormFieldSchemaPropertiesArrayValue['key'] | undefined => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
				undefined
			) {
				return undefined;
			}

			return savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey.prefillingChildIdentifier;
		},
	);

export const selectSavedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier =
	createSelector(
		[
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
		],
		(
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
		): FormFieldSchemaPropertiesArrayValue['key'] | undefined => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier ===
				undefined
			) {
				return undefined;
			}

			return savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingChildIdentifier;
		},
	);

export const selectPrefillingNodeLabelByActiveNode = createSelector(
	[selectPrefillingNodeByActiveNode],
	(prefillingNodeByActiveNode): string | undefined => {
		if (prefillingNodeByActiveNode === undefined) return undefined;

		return prefillingNodeByActiveNode.data.name;
	},
);

export const selectActivePrefillingParentModelByActiveNode = createSelector(
	[
		selectActivePrefillingParentIdentifier,
		selectActivePrefillingModelType,
		(state: RootState) => state.nodes.entities,
		(state: RootState) => state.globalDataSubsets.entities,
	],
	(
		activePrefillingParentIdentifier,
		activePrefillingModelType,
		nodeEntities,
		globalDataSubsetEntities,
	): Node | GlobalDataSubset | undefined => {
		if (
			activePrefillingParentIdentifier === undefined ||
			activePrefillingModelType === undefined
		) {
			return undefined;
		}

		if (activePrefillingModelType === 'Node') {
			return nodeEntities[activePrefillingParentIdentifier];
		}

		if (activePrefillingModelType === 'GlobalDataSubset') {
			return globalDataSubsetEntities[activePrefillingParentIdentifier];
		}

		return undefined;
	},
);

export const selectPrefillingParentModelByActiveNode = createSelector(
	[
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
		(state: RootState) => state.nodes.entities,
		(state: RootState) => state.globalDataSubsets.entities,
		selectActivePrefillingParentModelByActiveNode,
	],
	(
		savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier,
		nodeEntities,
		globalDataSubsetEntities,
		activePrefillingParentModelByActiveNode,
	): Node | GlobalDataSubset | undefined => {
		if (activePrefillingParentModelByActiveNode !== undefined) {
			return activePrefillingParentModelByActiveNode;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier ===
			undefined
		) {
			return undefined;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingModelType ===
			'Node'
		) {
			const prefillingNode =
				nodeEntities[
					savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier?.prefillingParentIdentifier ??
						''
				];

			if (prefillingNode === undefined) {
				return undefined;
			}

			return prefillingNode;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier.prefillingModelType ===
			'GlobalDataSubset'
		) {
			const prefillingGlobalDataSubset =
				globalDataSubsetEntities[
					savedNodeFormFieldMappingByActiveNodeAndActivePrefillingParentModelIdentifier?.prefillingParentIdentifier ??
						''
				];

			if (prefillingGlobalDataSubset === undefined) {
				return undefined;
			}

			return prefillingGlobalDataSubset;
		}

		return undefined;
	},
);

export const selectPrefillingParentModelLabelByActiveNode = createSelector(
	[selectPrefillingParentModelByActiveNode],
	(prefillingParentModelByActiveNode): string | undefined => {
		if (prefillingParentModelByActiveNode === undefined) return undefined;

		if (isNode(prefillingParentModelByActiveNode)) {
			return prefillingParentModelByActiveNode.data.name;
		}

		if (isGlobalDataSubset(prefillingParentModelByActiveNode)) {
			return prefillingParentModelByActiveNode.id;
		}

		return undefined;
	},
);

export const selectActivePrefillingParentLabelByActiveNode = createSelector(
	[selectActivePrefillingParentModelByActiveNode],
	(activePrefillingParentModelByActiveNode): string | undefined => {
		if (activePrefillingParentModelByActiveNode === undefined)
			return undefined;

		if (isNode(activePrefillingParentModelByActiveNode)) {
			return activePrefillingParentModelByActiveNode.data.name;
		}

		if (isGlobalDataSubset(activePrefillingParentModelByActiveNode)) {
			return activePrefillingParentModelByActiveNode.id;
		}

		return undefined;
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

				return savedNodeFormFieldMappingByActiveNodeAndPropertyKey?.prefillingChildIdentifier;
			},
		);
	};

export const selectPrefillingPropertyKeyByActiveNode = createSelector(
	[
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	],
	(
		savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		activePrefillingNodeFormFieldSchemaPropertyKey,
	): string | undefined => {
		if (activePrefillingNodeFormFieldSchemaPropertyKey !== undefined) {
			return activePrefillingNodeFormFieldSchemaPropertyKey;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
			undefined
		) {
			return undefined;
		}

		return savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey?.prefillingChildIdentifier;
	},
);

export const selectPrefillingChildIdentifierByActiveNode = createSelector(
	[
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		selectActivePrefillingChildIdentifier,
	],
	(
		savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		activePrefillingChildIdentifier,
	): string | undefined => {
		if (activePrefillingChildIdentifier !== undefined) {
			return activePrefillingChildIdentifier;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
			undefined
		) {
			return undefined;
		}

		return savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey?.prefillingChildIdentifier;
	},
);

export const selectVirtualActiveNodeFormFieldMapping = createSelector(
	[
		selectActiveNode,
		selectActiveNodeFormFieldPropertyKey,
		selectActivePrefillingNode,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
		selectActivePrefillingModelType,
	],
	(
		activeNode,
		activeNodeFormFieldPropertyKey,
		activePrefillingNode,
		activePrefillingNodeFormFieldSchemaPropertyKey,
		activePrefillingModelType,
	): NodeFormFieldMapping | undefined => {
		if (
			activeNode === undefined ||
			activeNodeFormFieldPropertyKey === undefined ||
			activePrefillingNode === undefined ||
			activePrefillingNodeFormFieldSchemaPropertyKey === undefined ||
			activePrefillingModelType === undefined
		)
			return undefined;

		return {
			nodeId: activeNode.id,
			nodeFormFieldSchemaPropertyKey: activeNodeFormFieldPropertyKey,
			prefillingParentIdentifier: activePrefillingNode.id,
			prefillingChildIdentifier:
				activePrefillingNodeFormFieldSchemaPropertyKey,
			prefillingModelType: activePrefillingModelType,
		};
	},
);

export const selectSavedAndVirtualActiveNodeFormFieldMappingsAreEqual =
	createSelector(
		[
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
			selectVirtualActiveNodeFormFieldMapping,
		],
		(
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
			virtualActiveNodeFormFieldMapping,
		) => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
					undefined ||
				virtualActiveNodeFormFieldMapping === undefined
			) {
				return false;
			}

			return nodeFormFieldMappingsAreEqual(
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
				virtualActiveNodeFormFieldMapping,
			);
		},
	);

// export const selectSavedAndVirtualActiveNodeFormFieldMappingsIsUpdate =
// 	createSelector(
// 		[
// 			selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
// 			selectActiveNode,
// 			selectActivePrefillingNode,
// 		],
// 		(
// 			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
// 			activeNode,
// 			activePrefillingNode,
// 		) => {
// 			if (
// 				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey === undefined ||
// 				activeNode === undefined ||
// 				activePrefillingNode === undefined
// 			) {
// 				return false;
// 			}

// 			return (
// 				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey.nodeId ===
// 					activeNode.id &&
// 				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey.prefillingNodeId ===
// 					activePrefillingNode.id
// 			);
// 		},
// 	);

export const selectPrefillMappingModalPrefillingNodeName = createSelector(
	[
		(state: RootState) => state.nodes.entities,
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		selectActivePrefillingNode,
	],
	(
		nodeEntities,
		savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		activePrefillingNode,
	): string | undefined => {
		if (activePrefillingNode !== undefined) {
			return activePrefillingNode.data.name;
		}

		const savedPrefillingNode =
			nodeEntities[
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey?.prefillingParentIdentifier ??
					''
			];

		if (savedPrefillingNode !== undefined) {
			return savedPrefillingNode.data.name;
		}

		return undefined;
	},
);

export const selectPrefillMappingModalPrefillingPropertyKey = createSelector(
	[
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	],
	(
		savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		activePrefillingNodeFormFieldSchemaPropertyKey,
	): string | undefined => {
		if (activePrefillingNodeFormFieldSchemaPropertyKey !== undefined) {
			return activePrefillingNodeFormFieldSchemaPropertyKey;
		}

		if (
			savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey !==
			undefined
		) {
			return savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey.prefillingChildIdentifier;
		}

		return undefined;
	},
);
