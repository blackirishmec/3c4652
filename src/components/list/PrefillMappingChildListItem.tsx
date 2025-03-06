import { memo, useCallback, useMemo } from 'react';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { HTMLAttributes, MouseEvent } from 'react';

import {
	selectClickedNodeId,
	setClickedNodeFormField,
} from '@/redux/features/ui/flow';

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
		() => (parentNode ? parentNode.data.name : prop_label),
		[parentNode, prop_label],
	);

	const dispatch = useAppDispatch();

	const clickedNodeId = useTypedSelector(selectClickedNodeId);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				clickedNodeId === undefined ||
				nodeFormFieldSchemaProperty === undefined ||
				parentNode === undefined
			)
				return;

			const clickedNodeFormField: NodeFormField = {
				nodeId: clickedNodeId,
				nodeFormFieldSchemaPropertyKey: nodeFormFieldSchemaProperty.key,
				prefillingNodeId: parentNode.id,
			};

			dispatch(setClickedNodeFormField(clickedNodeFormField));
		},
		[clickedNodeId, dispatch, nodeFormFieldSchemaProperty, parentNode],
	);

	return (
		<li onClick={handleLIOnClick} className={classes.childRow}>
			{label}
		</li>
	);
}

const PrefillMappingChildListItem = memo(PrefillMappingChildListItemBase);

export default PrefillMappingChildListItem;
