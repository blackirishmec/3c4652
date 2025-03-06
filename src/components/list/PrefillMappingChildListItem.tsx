import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { HTMLAttributes, MouseEvent } from 'react';

import {
	resetClickedNodeFormField,
	selectClickedNodeFormField,
	setClickedNodeFormField,
} from '@/redux/features/ui/flow';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';
import nodeFormFieldsAreEqual from '@/redux/utilities/nodeFormFieldsAreEqual';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

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
	nodeFormFieldSchemaProperty?: AvantosFieldSchemaPropertiesArrayValue;
	parentNode?: Node;
}

function PrefillMappingChildListItemBase({
	label: prop_label = 'Child Label',
	nodeFormFieldSchemaProperty,
	parentNode,
}: PrefillMappingChildListItemProps) {
	const label = useMemo(
		() =>
			nodeFormFieldSchemaProperty
				? nodeFormFieldSchemaProperty.key
				: prop_label,
		[nodeFormFieldSchemaProperty, prop_label],
	);

	const dispatch = useAppDispatch();

	const clickedNode = useTypedSelector(selectClickedNode);
	const clickedNodeFormField = useTypedSelector(selectClickedNodeFormField);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				clickedNode === undefined ||
				nodeFormFieldSchemaProperty === undefined ||
				parentNode === undefined
			)
				return;

			const tempClickedNodeFormField: NodeFormField = {
				nodeId: clickedNode.id,
				nodeFormFieldSchemaPropertyKey: nodeFormFieldSchemaProperty.key,
				prefillingNodeId: parentNode.id,
			};

			if (
				clickedNodeFormField !== undefined &&
				nodeFormFieldsAreEqual(
					tempClickedNodeFormField,
					clickedNodeFormField,
				)
			) {
				dispatch(resetClickedNodeFormField());
			} else {
				dispatch(setClickedNodeFormField(tempClickedNodeFormField));
			}

			_e.stopPropagation();
		},
		[
			clickedNode,
			clickedNodeFormField,
			dispatch,
			nodeFormFieldSchemaProperty,
			parentNode,
		],
	);

	const getNodeFormFieldIsClicked = useCallback((): boolean => {
		if (
			clickedNodeFormField !== undefined &&
			nodeFormFieldSchemaProperty !== undefined &&
			parentNode !== undefined &&
			clickedNode !== undefined
		) {
			return (
				clickedNodeFormField.nodeFormFieldSchemaPropertyKey ===
					nodeFormFieldSchemaProperty.key &&
				clickedNodeFormField.prefillingNodeId === parentNode.id &&
				clickedNodeFormField.nodeId === clickedNode.id
			);
		}

		return false;
	}, [
		clickedNode,
		clickedNodeFormField,
		nodeFormFieldSchemaProperty,
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
