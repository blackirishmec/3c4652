import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiXCircleFill } from 'react-icons/pi';

import type { Node } from '@/interfaces/models/nodeModels';
import type { HTMLAttributes, MouseEvent } from 'react';

import {
	removeNodeFormFieldMapping,
	selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	setActivePrefillingNodeFormFieldMappedPropertyKey,
	setActivePrefillingNodeId,
} from '@/redux/features/ui/flow';
import {
	createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey,
	selectPrefillingNodeByActiveNode,
	selectPrefillingPropertyKeyByActiveNode,
	selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
} from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import {
	selectActiveNode,
	selectPrefillingEnabledByActiveNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from '@/components/layout/FlexComponents';

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
	mappedChildRow: `
		bg-green-100
		hover:bg-gray-100!
	`,
	saved: `
		bg-green-100
	`,
	savedButUpdated: `
		bg-red-100
	`,
} as const;

export interface PrefillMappingChildListItemProps
	extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
	label?: string;
	prefillingNodeFormFieldSchemaPropertyKey?: string;
	prefillingNode: Node;
}

function PrefillMappingChildListItemBase({
	label: prop_label = 'Child Label',
	prefillingNodeFormFieldSchemaPropertyKey,
	prefillingNode,
}: PrefillMappingChildListItemProps) {
	const label = useMemo(
		() => prefillingNodeFormFieldSchemaPropertyKey ?? prop_label,
		[prefillingNodeFormFieldSchemaPropertyKey, prop_label],
	);

	const dispatch = useAppDispatch();

	const activeNode = useTypedSelector(selectActiveNode);
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
		selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
	);

	const selectSavedNodeFormFieldMappingForActiveNodeByPropertyKey = useMemo(
		() =>
			createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey(
				prefillingNodeFormFieldSchemaPropertyKey ?? '',
			),
		[prefillingNodeFormFieldSchemaPropertyKey],
	);
	const savedNodeFormFieldMappingForActiveNodeByPropertyKey =
		useTypedSelector(
			selectSavedNodeFormFieldMappingForActiveNodeByPropertyKey,
		);

	const prefillingEnabledByActiveNode = useTypedSelector(
		selectPrefillingEnabledByActiveNode,
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (prefillingNodeFormFieldSchemaPropertyKey === undefined) return;

			if (
				activePrefillingNodeFormFieldSchemaPropertyKey !==
				prefillingNodeFormFieldSchemaPropertyKey
			) {
				dispatch(setActivePrefillingNodeId(prefillingNode.id));
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
			prefillingNode,
		],
	);

	const getNodeFormFieldIsMapped = useCallback((): boolean => {
		if (
			activeNode !== undefined &&
			prefillingNodeByActiveNode !== undefined &&
			prefillingPropertyKeyByActiveNode !== undefined &&
			prefillingNodeFormFieldSchemaPropertyKey !== undefined
		) {
			return (
				prefillingNodeByActiveNode.id === prefillingNode.id &&
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
		prefillingNode,
	]);
	const listItemIsMapped = useMemo(
		() => getNodeFormFieldIsMapped(),
		[getNodeFormFieldIsMapped],
	);

	const listItemMatchesSaved = useMemo(
		() =>
			savedNodeFormFieldMappingByActiveNode !== undefined &&
			savedNodeFormFieldMappingByActiveNode?.prefillingNodeId ===
				prefillingNode.id,
		[prefillingNode.id, savedNodeFormFieldMappingByActiveNode],
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

	const isUpdatedSavedListItem = useMemo(
		() =>
			listItemMatchesSaved &&
			prefillingNodeFormFieldSchemaKeyMatchesSaved &&
			!activeNodeFormFieldSchemaKeyMatchesSaved,
		[
			activeNodeFormFieldSchemaKeyMatchesSaved,
			prefillingNodeFormFieldSchemaKeyMatchesSaved,
			listItemMatchesSaved,
		],
	);

	const isSavedListItem = useMemo(
		() =>
			listItemMatchesSaved &&
			prefillingNodeFormFieldSchemaKeyMatchesSaved &&
			activeNodeFormFieldSchemaKeyMatchesSaved,
		[
			prefillingNodeFormFieldSchemaKeyMatchesSaved,
			listItemMatchesSaved,
			activeNodeFormFieldSchemaKeyMatchesSaved,
		],
	);

	const handleRemoveMappingOnClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			if (
				savedNodeFormFieldMappingForActiveNodeByPropertyKey ===
				undefined
			) {
				return;
			}

			dispatch(
				removeNodeFormFieldMapping(
					savedNodeFormFieldMappingForActiveNodeByPropertyKey,
				),
			);

			e.stopPropagation();
		},
		[dispatch, savedNodeFormFieldMappingForActiveNodeByPropertyKey],
	);

	return (
		<li
			onClick={handleLIOnClick}
			className={clsx(
				classes.childRow,
				listItemIsMapped && classes.mappedChildRow,
				isSavedListItem && classes.saved,
				isUpdatedSavedListItem && classes.savedButUpdated,
			)}
		>
			<Row className="flex-1">
				<Col className="flex-1">{label}</Col>
				{listItemIsMapped &&
					listItemMatchesSaved &&
					activeNodeFormFieldSchemaKeyMatchesSaved && (
						<Col
							className="pr-1"
							onClick={handleRemoveMappingOnClick}
							childrenVerticalPosition="center"
						>
							<PiXCircleFill
								className={clsx(
									'text-gray-400 hover:text-gray-500 hover:bg-red-300 rounded-full',
									!prefillingEnabledByActiveNode &&
										'pointer-events-none',
								)}
								size={24}
							/>
						</Col>
					)}
			</Row>
		</li>
	);
}

const PrefillMappingChildListItem = memo(PrefillMappingChildListItemBase);

export default PrefillMappingChildListItem;
