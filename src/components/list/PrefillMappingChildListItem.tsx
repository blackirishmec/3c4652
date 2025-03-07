import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { HTMLAttributes, MouseEvent } from 'react';

import {
	resetActivePrefillingNodeFormFieldMappedPropertyKey,
	resetActivePrefillingNodeId,
	selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	setActivePrefillingNodeFormFieldMappedPropertyKey,
	setActivePrefillingNodeId,
} from '@/redux/features/ui/flow';
import {
	selectActiveNode,
	selectActivePrefillingNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

// // 1. Finish renaming vars from the flow slice
// // 2. Clean up names of selectors in relationship selector files
// 3. Load nodeFormFieldMappings to the PrefillMappingModal when opening it (if they exist!)
//	- Fix loading into Active Form Fields (of mappings)
// 4. Wire up 'prefill' toggle
// 5. Create and implement tests (jest + property based tests?)
// 6. Handle global data sources
// 7. Handle new data sources
// 8. Create documentation (ref M-H-A)
// 9. Clean up code
//	- Extract from components into thunks
// ***
// 10. Augment code
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
	const activeNodePrefillingNode = useTypedSelector(
		selectActivePrefillingNode,
	);
	const activePrefillingNodeFormFieldSchemaPropertyKey = useTypedSelector(
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				prerequisiteNode === undefined ||
				formFieldSchemaPropertiesArrayValueByPrerequisiteNode ===
					undefined
			)
				return;

			if (
				activeNodePrefillingNode !== undefined &&
				activePrefillingNodeFormFieldSchemaPropertyKey !== undefined &&
				activeNodePrefillingNode.id === prerequisiteNode.id &&
				activePrefillingNodeFormFieldSchemaPropertyKey ===
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
			) {
				dispatch(resetActivePrefillingNodeId());
				dispatch(resetActivePrefillingNodeFormFieldMappedPropertyKey());
			} else {
				dispatch(setActivePrefillingNodeId(prerequisiteNode.id));
				dispatch(
					setActivePrefillingNodeFormFieldMappedPropertyKey(
						formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key,
					),
				);
			}

			_e.stopPropagation();
		},
		[
			activeNodePrefillingNode,
			activePrefillingNodeFormFieldSchemaPropertyKey,
			dispatch,
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode,
			prerequisiteNode,
		],
	);

	const getNodeFormFieldIsClicked = useCallback((): boolean => {
		if (
			activeNode !== undefined &&
			activeNodePrefillingNode !== undefined &&
			activePrefillingNodeFormFieldSchemaPropertyKey !== undefined &&
			prerequisiteNode !== undefined &&
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode !== undefined
		) {
			return (
				activeNodePrefillingNode.id === prerequisiteNode.id &&
				activePrefillingNodeFormFieldSchemaPropertyKey ===
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
			);
		}

		return false;
	}, [
		activeNode,
		activeNodePrefillingNode,
		activePrefillingNodeFormFieldSchemaPropertyKey,
		formFieldSchemaPropertiesArrayValueByPrerequisiteNode,
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
