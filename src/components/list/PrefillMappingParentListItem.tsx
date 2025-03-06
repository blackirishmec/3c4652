import { memo, useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';
import { PiCaretDownBold, PiCaretRightBold } from 'react-icons/pi';

import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { HTMLAttributes, MouseEvent } from 'react';

import { selectNodeById } from '@/redux/features/model/nodes';
import { selectSelectedClickedNodeFormField } from '@/redux/features/ui/flow';
import { createSelectNodeFormFieldSchemaPropertiesArray } from '@/redux/selectors/relationships/formRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from '@/components/layout/FlexComponents';
import PrefillMappingChildrenListCol from '@/components/list/PrefillMappingChildrenListCol';

const classes = {
	parentRow: `
		cursor-pointer 
		border 
		rounded-sm 
		border-dashed 
		border-transparent 
		py-1
		hover:border-blue-500!
		hover:bg-blue-100 
	`,
	expandedParentRow: `
		border-solid!
		border-transparent!
		bg-blue-100
		hover:bg-gray-100!
	`,
} as const;

export interface PrefillMappingParentListItemProps
	extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
	childrenListItemData?: unknown[];
	label?: string;
	parentNode?: Node;
}

function PrefillMappingParentListItemBase({
	childrenListItemData,
	label: prop_label = 'Parent Label',
	parentNode,
	...props
}: PrefillMappingParentListItemProps) {
	const label = useMemo(
		() => (parentNode ? parentNode.data.name : prop_label),
		[parentNode, prop_label],
	);

	const selectNodeFormFieldSchemaPropertiesArray = useMemo(
		() =>
			createSelectNodeFormFieldSchemaPropertiesArray(
				parentNode ? parentNode.id : '',
			),
		[parentNode],
	);
	const nodeFormFieldSchemaPropertiesArray = useTypedSelector(
		selectNodeFormFieldSchemaPropertiesArray,
	);
	const clickedNodeFormField = useTypedSelector(
		selectSelectedClickedNodeFormField,
	);

	const clickedParentNode = useTypedSelector((state: RootState) =>
		selectNodeById(state, clickedNodeFormField?.prefillingNodeId ?? ''),
	);

	const [childrenListExpanded, setChildrenListExpanded] = useState(false);

	const handleParentLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			setChildrenListExpanded(!childrenListExpanded);

			_e.stopPropagation();
		},
		[childrenListExpanded],
	);

	return (
		<li
			// className={clsx(
			// 	classes.parentRow,
			// 	childrenListExpanded && classes.expandedParentRow,
			// )}
			onClick={handleParentLIOnClick}
			{...props}
		>
			<Col className="flex-1">
				<Row
					className={clsx(
						classes.parentRow,
						clickedParentNode !== undefined &&
							clickedParentNode.id === parentNode?.id &&
							classes.expandedParentRow,
					)}
				>
					<Col className="px-2" childrenVerticalPosition="center">
						{childrenListExpanded ? (
							<PiCaretDownBold size={12} />
						) : (
							<PiCaretRightBold size={12} />
						)}
					</Col>
					<Col className="flex-1">{label}</Col>
				</Row>
				{childrenListExpanded && (
					<Row className="bg-[#F6F6F6]">
						<PrefillMappingChildrenListCol
							parentNode={parentNode}
							nodeFormFieldSchemaPropertiesArray={
								nodeFormFieldSchemaPropertiesArray
							}
						/>
					</Row>
				)}
			</Col>
		</li>
	);
}

const PrefillMappingParentListItem = memo(PrefillMappingParentListItemBase);

export default PrefillMappingParentListItem;
