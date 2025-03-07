import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { HTMLAttributes, MouseEvent } from 'react';

import {
	resetActiveNodeFormFieldMappedPropertyKey,
	selectActiveNodeFormFieldPropertyKey,
	selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	setActiveNodeFormFieldMappedPropertyKey,
} from '@/redux/features/ui/flow';
import { createSelectNodeFormFieldMapping } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import { selectActiveNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';
import nodeFormFieldsAreEqual from '@/redux/utilities/nodeFormFieldsAreEqual';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

// 1. Finish renaming vars from the flow slice
// 2. Clean up names of selectors in relationship selector files
// 3. Load nodeFormFieldMappings to the PrefillMappingModal when opening it (if they exist!)
//	- Fix loading into Active Form Fields (of mappings)
// 4. Wire up 'prefill' toggle
// 5. Create and implement tests (jest + property based tests?)
// 6. Handle new data sources
// 7. Create documentation (ref M-H-A)
// 8. Clean up code
//	- Extract from components into thunks
// ***
// 9. Augment code
//	- Simulate 'save updates' thunk for nodeFormFieldMappings

const classes = {
	childRow: `
		cursor-pointer 
		border 
		rounded-sm 
		border-dashed 
		border-transparent 
		py-1
		pl-10
		hover:border-green-500!
		hover:bg-green-100 
	`,
	clickedChildRow: `
		bg-green-100
		hover:bg-gray-100!
	`,
} as const;

export interface PrefillMappingChildListItemProps
	extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
	label?: string;
	formFieldSchemaPropertiesArrayValueByPrerequisiteNode?: FormFieldSchemaPropertiesArrayValue;
	prerequisiteNode?: Node;
}

function PrefillMappingChildListItemBase({
	label: prop_label = 'Child Label',
	formFieldSchemaPropertiesArrayValueByPrerequisiteNode,
	prerequisiteNode,
}: PrefillMappingChildListItemProps) {
	const label = useMemo(
		() =>
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode
				? formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
				: prop_label,
		[formFieldSchemaPropertiesArrayValueByPrerequisiteNode, prop_label],
	);

	const dispatch = useAppDispatch();

	const activeNode = useTypedSelector(selectActiveNode);
	const activeNodeFormFieldPropertyKey = useTypedSelector(
		selectActiveNodeFormFieldPropertyKey,
	);
	const activePrefillingNodeFormFieldSchemaPropertyKey = useTypedSelector(
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	);

	const selectNodeFormFieldMappingByActiveNode = useMemo(
		() =>
			createSelectNodeFormFieldMapping({
				nodeId: activeNode?.id ?? '',
				nodeFormFieldPropertyKey: activeNodeFormFieldPropertyKey ?? '',
				prerequisiteNodeId:
					activePrefillingNodeFormFieldSchemaPropertyKey ?? '',
				prerequisiteNodeFormFieldPropertyKey:
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode?.key ??
					'',
			}),
		[
			activeNode?.id,
			activePrefillingNodeFormFieldSchemaPropertyKey,
			activeNodeFormFieldPropertyKey,
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode?.key,
		],
	);
	const nodeFormFieldMappingByActiveNode = useTypedSelector(
		selectNodeFormFieldMappingByActiveNode,
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				activeNode === undefined ||
				formFieldSchemaPropertiesArrayValueByPrerequisiteNode ===
					undefined ||
				prerequisiteNode === undefined ||
				activeNodeFormFieldPropertyKey === undefined
			)
				return;

			const tempNodeFormFieldMappingByActiveNode: NodeFormFieldMapping = {
				nodeId: activeNode.id,
				nodeFormFieldSchemaPropertyKey: activeNodeFormFieldPropertyKey,
				prefillingNodeId: prerequisiteNode.id,
				prefillingNodeFormFieldSchemaPropertyKey:
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key,
			};

			if (
				activePrefillingNodeFormFieldSchemaPropertyKey !== undefined &&
				nodeFormFieldMappingByActiveNode !== undefined &&
				nodeFormFieldsAreEqual(
					nodeFormFieldMappingByActiveNode,
					tempNodeFormFieldMappingByActiveNode,
				)
			) {
				dispatch(resetActiveNodeFormFieldMappedPropertyKey());
			} else {
				if (
					activePrefillingNodeFormFieldSchemaPropertyKey === undefined
				)
					return;
				dispatch(
					setActiveNodeFormFieldMappedPropertyKey(
						activePrefillingNodeFormFieldSchemaPropertyKey,
					),
				);
			}

			_e.stopPropagation();
		},
		[
			activeNode,
			activePrefillingNodeFormFieldSchemaPropertyKey,
			activeNodeFormFieldPropertyKey,
			dispatch,
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode,
			nodeFormFieldMappingByActiveNode,
			prerequisiteNode,
		],
	);

	const getNodeFormFieldIsClicked = useCallback((): boolean => {
		if (
			activeNode !== undefined &&
			nodeFormFieldMappingByActiveNode !== undefined &&
			prerequisiteNode !== undefined &&
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode !== undefined
		) {
			return (
				nodeFormFieldMappingByActiveNode.nodeFormFieldSchemaPropertyKey ===
					activeNodeFormFieldPropertyKey &&
				nodeFormFieldMappingByActiveNode.prefillingNodeId ===
					prerequisiteNode.id &&
				nodeFormFieldMappingByActiveNode.nodeId === activeNode.id &&
				nodeFormFieldMappingByActiveNode.prefillingNodeFormFieldSchemaPropertyKey ===
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
			);
		}

		return false;
	}, [
		activeNode,
		activeNodeFormFieldPropertyKey,
		formFieldSchemaPropertiesArrayValueByPrerequisiteNode,
		nodeFormFieldMappingByActiveNode,
		prerequisiteNode,
	]);
	const nodeFormFieldIsClicked = useMemo(
		() => getNodeFormFieldIsClicked(),
		[getNodeFormFieldIsClicked],
	);

	return (
		<li
			onClick={handleLIOnClick}
			className={clsx(
				classes.childRow,
				nodeFormFieldIsClicked && classes.clickedChildRow,
			)}
		>
			{label}
		</li>
	);
}

const PrefillMappingChildListItem = memo(PrefillMappingChildListItemBase);

export default PrefillMappingChildListItem;
