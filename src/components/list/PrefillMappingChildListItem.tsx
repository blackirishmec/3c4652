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
	selectPrefillingNodeByActiveNode,
	selectPrefillingPropertyKeyByActiveNode,
} from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import {
	selectActiveNode,
	selectActivePrefillingNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

// // 1. Finish renaming vars from the flow slice
// // 2. Clean up names of selectors in relationship selector files
// 3. // // Load nodeFormFieldMappings to the PrefillMappingModal when opening it (if they exist!)
// //	- Fix loading into Active Form Fields (of mappings)
// !- Fix updating preloaded actions (changing from what is saved, toggling) [45m]
// // 4. Wire up 'search' bar
// 5. Wire up 'cancel' button per FormFieldRow. [10m]
// 6. Wire up 'prefill' toggle [1hr]
// 7. Create and implement tests (jest + property based tests?) [2h]
// 8. Handle global data sources [1hr]
// 9. Handle new data sources [1hr]
// 10. Create documentation (ref M-H-A) [30m]
// 11. Clean up code
//	- Extract from components into thunks
// ***
// 12. Augment code
//	- Simulate 'save updates' thunk for nodeFormFieldMappings [15m]

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
	const prefillingNodeByActiveNode = useTypedSelector(
		selectPrefillingNodeByActiveNode,
	);
	const prefillingPropertyKeyByActiveNode = useTypedSelector(
		selectPrefillingPropertyKeyByActiveNode,
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
			prefillingNodeByActiveNode !== undefined &&
			prefillingPropertyKeyByActiveNode !== undefined &&
			prerequisiteNode !== undefined &&
			formFieldSchemaPropertiesArrayValueByPrerequisiteNode !== undefined
		) {
			return (
				prefillingNodeByActiveNode.id === prerequisiteNode.id &&
				prefillingPropertyKeyByActiveNode ===
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
			);
		}

		return false;
	}, [
		activeNode,
		prefillingNodeByActiveNode,
		prefillingPropertyKeyByActiveNode,
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
