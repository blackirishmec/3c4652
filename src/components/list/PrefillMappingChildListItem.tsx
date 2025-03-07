import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { HTMLAttributes, MouseEvent } from 'react';

import {
	resetActiveNodeFormFieldMappedPropertyKey,
	selectActiveNodeFormFieldMappedPropertyKey,
	selectActiveNodeFormFieldPropertyKey,
	setActiveNodeFormFieldMappedPropertyKey,
} from '@/redux/features/ui/flow';
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
	formFieldSchemaPropertiesArrayValue?: FormFieldSchemaPropertiesArrayValue;
	parentNode?: Node;
}

function PrefillMappingChildListItemBase({
	label: prop_label = 'Child Label',
	formFieldSchemaPropertiesArrayValue,
	parentNode,
}: PrefillMappingChildListItemProps) {
	const label = useMemo(
		() =>
			formFieldSchemaPropertiesArrayValue
				? formFieldSchemaPropertiesArrayValue.key
				: prop_label,
		[formFieldSchemaPropertiesArrayValue, prop_label],
	);

	const dispatch = useAppDispatch();

	const activeNode = useTypedSelector(selectActiveNode);
	const activeNodeFormFieldPropertyKey = useTypedSelector(
		selectActiveNodeFormFieldPropertyKey,
	);
	const activeNodeFormFieldMappedPropertyKey = useTypedSelector(
		selectActiveNodeFormFieldMappedPropertyKey,
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				activeNode === undefined ||
				formFieldSchemaPropertiesArrayValue === undefined ||
				parentNode === undefined ||
				activeNodeFormFieldPropertyKey === undefined
			)
				return;

			const tempClickedNodeFormField: NodeFormFieldMapping = {
				nodeId: activeNode.id,
				nodeFormFieldSchemaPropertyKey:
					formFieldSchemaPropertiesArrayValue.key,
				prefillingNodeId: parentNode.id,
				prefillingNodeFormFieldSchemaPropertyKey:
					activeNodeFormFieldPropertyKey,
			};

			if (
				activeNodeFormFieldMappedPropertyKey !== undefined &&
				nodeFormFieldsAreEqual(
					tempClickedNodeFormField,
					activeNodeFormFieldMappedPropertyKey,
				)
			) {
				dispatch(resetActiveNodeFormFieldMappedPropertyKey());
			} else {
				dispatch(
					setActiveNodeFormFieldMappedPropertyKey(
						tempClickedNodeFormField,
					),
				);
			}

			_e.stopPropagation();
		},
		[
			activeNode,
			activeNodeFormFieldMappedPropertyKey,
			activeNodeFormFieldPropertyKey,
			dispatch,
			formFieldSchemaPropertiesArrayValue,
			parentNode,
		],
	);

	const getNodeFormFieldIsClicked = useCallback((): boolean => {
		if (
			activeNodeFormFieldMappedPropertyKey !== undefined &&
			formFieldSchemaPropertiesArrayValue !== undefined &&
			parentNode !== undefined &&
			activeNode !== undefined
		) {
			return (
				activeNodeFormFieldMappedPropertyKey.nodeFormFieldSchemaPropertyKey ===
					formFieldSchemaPropertiesArrayValue.key &&
				activeNodeFormFieldMappedPropertyKey.prefillingNodeId ===
					parentNode.id &&
				activeNodeFormFieldMappedPropertyKey.nodeId === activeNode.id
			);
		}

		return false;
	}, [
		activeNode,
		activeNodeFormFieldMappedPropertyKey,
		formFieldSchemaPropertiesArrayValue,
		parentNode,
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
