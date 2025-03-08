import { createSelector } from '@reduxjs/toolkit';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import {
	selectActiveNodeFormFieldPropertyKey,
	selectActivePrefillingChildIdentifier,
	selectActivePrefillingModelType,
	selectActivePrefillingParentIdentifier,
	selectNodeFormFieldMappings,
} from '@/redux/features/ui/flow/selectors';
import {
	selectActiveNode,
	selectActivePrefillingNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import isGlobalDataSubset from '@/utilities/type_guards/GlobalDataSubsetTypeGuards';
import isNode from '@/utilities/type_guards/NodeTypeGuards';

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

export const selectSavedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier =
	createSelector(
		[
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
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

export const selectSavedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier =
	createSelector(
		[selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey],
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
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
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
		selectActivePrefillingParentModelByActiveNode,
		selectActivePrefillingChildIdentifier,
		selectActivePrefillingModelType,
	],
	(
		activeNode,
		activeNodeFormFieldPropertyKey,
		activePrefillingParentModelByActiveNode,
		activePrefillingChildIdentifier,
		activePrefillingModelType,
	): NodeFormFieldMapping | undefined => {
		if (
			activeNode === undefined ||
			activeNodeFormFieldPropertyKey === undefined ||
			activePrefillingParentModelByActiveNode === undefined ||
			activePrefillingChildIdentifier === undefined ||
			activePrefillingModelType === undefined
		)
			return undefined;

		return {
			nodeId: activeNode.id,
			nodeFormFieldSchemaPropertyKey: activeNodeFormFieldPropertyKey,
			prefillingParentIdentifier:
				activePrefillingParentModelByActiveNode.id,
			prefillingChildIdentifier: activePrefillingChildIdentifier,
			prefillingModelType: activePrefillingModelType,
		};
	},
);
