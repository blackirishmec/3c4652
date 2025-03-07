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
	selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
	selectSavedPrefillingNodeByActiveNodeAndActivePropertyKey,
	selectSavedPrefillingNodeFormFieldSchemaPropertyKeyByActiveNodeAndActivePropertyKey,
} from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import {
	selectActivePrefillingNode,
	selectPrefillingEnabledByActiveNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from '@/components/layout/FlexComponents';

// // 1. Finish renaming vars from the flow slice
// // 2. Clean up names of selectors in relationship selector files
// // 3. // // Load nodeFormFieldMappings to the PrefillMappingModal when opening it (if they exist!)
// //	- Fix loading into Active Form Fields (of mappings)
// // !- Fix updating preloaded actions (changing from what is saved, toggling) [45m]
// // 4. Wire up 'search' bar
// // 5. Wire up 'cancel' button per FormFieldRow. [10m]
// // 6. Wire up 'prefill' toggle [1hr]
// 7. Handle global data sources [1hr]
// 8. Create and implement tests (jest + property based tests?) [2h]
// 9. Handle new data sources [1hr]
// 10. // // Create documentation (ref M-H-A) [30m]
// !- Test
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
	hasActiveOrSavedMapping: `
		bg-green-100
	`,
	savedButUpdated: `
		bg-red-100!
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

	const activePrefillingNode = useTypedSelector(selectActivePrefillingNode);
	const activePrefillingNodeFormFieldSchemaPropertyKey = useTypedSelector(
		selectActivePrefillingNodeFormFieldSchemaPropertyKey,
	);
	const savedPrefillingNodeByActiveNodeAndActivePropertyKey =
		useTypedSelector(
			selectSavedPrefillingNodeByActiveNodeAndActivePropertyKey,
		);

	const savedPrefillingNodeFormFieldSchemaPropertyKeyByActiveNodeAndActivePropertyKey =
		useTypedSelector(
			selectSavedPrefillingNodeFormFieldSchemaPropertyKeyByActiveNodeAndActivePropertyKey,
		);

	const savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey =
		useTypedSelector(
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
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

	const listItemHasActiveMapping = useMemo(
		() =>
			activePrefillingNode?.id === prefillingNode.id &&
			activePrefillingNodeFormFieldSchemaPropertyKey ===
				prefillingNodeFormFieldSchemaPropertyKey,
		[
			activePrefillingNode?.id,
			activePrefillingNodeFormFieldSchemaPropertyKey,
			prefillingNode.id,
			prefillingNodeFormFieldSchemaPropertyKey,
		],
	);

	const listItemHasSavedMapping = useMemo(
		() =>
			savedPrefillingNodeByActiveNodeAndActivePropertyKey?.id ===
				prefillingNode.id &&
			savedPrefillingNodeFormFieldSchemaPropertyKeyByActiveNodeAndActivePropertyKey ===
				prefillingNodeFormFieldSchemaPropertyKey,
		[
			prefillingNode.id,
			prefillingNodeFormFieldSchemaPropertyKey,
			savedPrefillingNodeByActiveNodeAndActivePropertyKey,
			savedPrefillingNodeFormFieldSchemaPropertyKeyByActiveNodeAndActivePropertyKey,
		],
	);

	const listItemHasUpdatedSavedMapping = useMemo(
		() =>
			listItemHasSavedMapping &&
			activePrefillingNodeFormFieldSchemaPropertyKey !== undefined &&
			!listItemHasActiveMapping,
		[
			activePrefillingNodeFormFieldSchemaPropertyKey,
			listItemHasActiveMapping,
			listItemHasSavedMapping,
		],
	);

	const listItemHasActiveOrSavedMapping = useMemo(
		() => listItemHasSavedMapping || listItemHasActiveMapping,
		[listItemHasActiveMapping, listItemHasSavedMapping],
	);

	const listItemHasActiveAndSavedMapping = useMemo(
		() => listItemHasSavedMapping && listItemHasActiveMapping,
		[listItemHasActiveMapping, listItemHasSavedMapping],
	);

	const handleRemoveMappingOnClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
				undefined
			) {
				return;
			}

			dispatch(
				removeNodeFormFieldMapping(
					savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
				),
			);

			e.stopPropagation();
		},
		[dispatch, savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey],
	);

	return (
		<li
			onClick={handleLIOnClick}
			className={clsx(
				classes.childRow,
				listItemHasActiveOrSavedMapping &&
					classes.hasActiveOrSavedMapping,
				listItemHasUpdatedSavedMapping && classes.savedButUpdated,
			)}
		>
			<Row className="flex-1">
				<Col className="flex-1">{label}</Col>
				{((listItemHasSavedMapping &&
					activePrefillingNodeFormFieldSchemaPropertyKey ===
						undefined) ||
					listItemHasActiveAndSavedMapping) && (
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
