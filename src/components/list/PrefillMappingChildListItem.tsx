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
	selectSavedNodeFormFieldMappingByActiveNode,
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
// // 5. Wire up 'cancel' button per FormFieldRow. [10m]
// // 6. Wire up 'prefill' toggle [1hr]
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
		hover:border-green-500
		hover:bg-green-100 
	`,
	clickedChildRow: `
		bg-green-100
		hover:bg-gray-100!
	`,
	siblingOfSaved: `
		hover:bg-green-100
		hover:border-orange-100
	`,
	saved: `
		border-orange-500!
		hover:border-red-500
		hover:bg-red-100
	`,
	savedButUpdated: `
		bg-orange-100
		hover:border-purple-500
		hover:bg-green-100
		hover:border-green-100
	`,
	savedNotUpdated: `
		bg-green-100
	`,
} as const;

export interface PrefillMappingChildListItemProps
	extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
	label?: string;
	prefillingNodeFormFieldSchemaPropertyKey?: string;
	prerequisiteNode?: Node;
}

function PrefillMappingChildListItemBase({
	label: prop_label = 'Child Label',
	prefillingNodeFormFieldSchemaPropertyKey,
	prerequisiteNode,
}: PrefillMappingChildListItemProps) {
	const label = useMemo(
		() => prefillingNodeFormFieldSchemaPropertyKey ?? prop_label,
		[prefillingNodeFormFieldSchemaPropertyKey, prop_label],
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
	const savedNodeFormFieldMappingByActiveNode = useTypedSelector(
		selectSavedNodeFormFieldMappingByActiveNode,
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				prerequisiteNode === undefined ||
				prefillingNodeFormFieldSchemaPropertyKey === undefined
			)
				return;

			if (
				activePrefillingNodeFormFieldSchemaPropertyKey !==
				prefillingNodeFormFieldSchemaPropertyKey
			) {
				dispatch(setActivePrefillingNodeId(prerequisiteNode.id));
				dispatch(
					setActivePrefillingNodeFormFieldMappedPropertyKey(
						prefillingNodeFormFieldSchemaPropertyKey,
					),
				);
			}

			_e.stopPropagation();
		},
		[
			activePrefillingNodeFormFieldSchemaPropertyKey,
			dispatch,
			prefillingNodeFormFieldSchemaPropertyKey,
			prerequisiteNode,
		],
	);

	const getNodeFormFieldIsMapped = useCallback((): boolean => {
		if (
			activeNode !== undefined &&
			prefillingNodeByActiveNode !== undefined &&
			prefillingPropertyKeyByActiveNode !== undefined &&
			prerequisiteNode !== undefined &&
			prefillingNodeFormFieldSchemaPropertyKey !== undefined
		) {
			return (
				prefillingNodeByActiveNode.id === prerequisiteNode.id &&
				prefillingPropertyKeyByActiveNode ===
					prefillingNodeFormFieldSchemaPropertyKey
			);
		}

		return false;
	}, [
		activeNode,
		prefillingNodeByActiveNode,
		prefillingPropertyKeyByActiveNode,
		prefillingNodeFormFieldSchemaPropertyKey,
		prerequisiteNode,
	]);
	const nodeFormFieldIsMapped = useMemo(
		() => getNodeFormFieldIsMapped(),
		[getNodeFormFieldIsMapped],
	);

	const prefillingNodeMatchesSaved = useMemo(
		() =>
			savedNodeFormFieldMappingByActiveNode !== undefined &&
			savedNodeFormFieldMappingByActiveNode?.prefillingNodeId ===
				prerequisiteNode?.id,
		[prerequisiteNode?.id, savedNodeFormFieldMappingByActiveNode],
	);
	const prefillingNodeFormFieldSchemaKeyMatchesSaved = useMemo(
		() =>
			savedNodeFormFieldMappingByActiveNode !== undefined &&
			savedNodeFormFieldMappingByActiveNode?.prefillingNodeFormFieldSchemaPropertyKey ===
				prefillingNodeFormFieldSchemaPropertyKey,
		[
			prefillingNodeFormFieldSchemaPropertyKey,
			savedNodeFormFieldMappingByActiveNode,
		],
	);
	const activeNodeFormFieldSchemaKeyMatchesSaved = useMemo(
		() =>
			savedNodeFormFieldMappingByActiveNode !== undefined &&
			savedNodeFormFieldMappingByActiveNode?.prefillingNodeFormFieldSchemaPropertyKey ===
				activePrefillingNodeFormFieldSchemaPropertyKey,
		[
			activePrefillingNodeFormFieldSchemaPropertyKey,
			savedNodeFormFieldMappingByActiveNode,
		],
	);

	return (
		<li
			onClick={handleLIOnClick}
			className={clsx(
				classes.childRow,
				nodeFormFieldIsMapped && classes.clickedChildRow,
				prefillingNodeMatchesSaved &&
					!prefillingNodeFormFieldSchemaKeyMatchesSaved &&
					classes.siblingOfSaved,
				prefillingNodeMatchesSaved &&
					prefillingNodeFormFieldSchemaKeyMatchesSaved &&
					classes.saved,
				prefillingNodeMatchesSaved &&
					prefillingNodeFormFieldSchemaKeyMatchesSaved &&
					activeNodeFormFieldSchemaKeyMatchesSaved &&
					classes.savedNotUpdated,
				prefillingNodeMatchesSaved &&
					prefillingNodeFormFieldSchemaKeyMatchesSaved &&
					!activeNodeFormFieldSchemaKeyMatchesSaved &&
					classes.savedButUpdated,
			)}
		>
			{label}
		</li>
	);
}

const PrefillMappingChildListItem = memo(PrefillMappingChildListItemBase);

export default PrefillMappingChildListItem;
