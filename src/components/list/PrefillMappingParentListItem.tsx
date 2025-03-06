import { memo, useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';
import { PiCaretDownBold, PiCaretRightBold } from 'react-icons/pi';

import type { NodeFormField } from '@/interfaces/AvantosInterfaces';
import type { Node } from '@/interfaces/models/nodeModels';
import type { HTMLAttributes, MouseEvent } from 'react';

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
		hover:border-blue-500
		hover:bg-blue-100 
	`,
	expandedParentRow: `
		border-solid!
		border-transparent!
		bg-blue-100
		hover:border-gray-100!
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
	label: prop_label = 'Label',
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
		[],
	);
	const nodeFormFieldSchemaPropertiesArray = useTypedSelector(
		selectNodeFormFieldSchemaPropertiesArray,
	);

	const [childrenListExpanded, setChildrenListExpanded] = useState(false);
	const [tempNodeFormField, setTempNodeFormField] = useState<NodeFormField[]>(
		[],
	);

	const handleParentLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			setChildrenListExpanded(!childrenListExpanded);
		},
		[childrenListExpanded],
	);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
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
						childrenListExpanded && classes.expandedParentRow,
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
