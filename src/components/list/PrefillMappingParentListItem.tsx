import { memo, useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';
import { PiCaretDownBold, PiCaretRightBold } from 'react-icons/pi';

import type { Node } from '@/interfaces/models/nodeModels';
import type { HTMLAttributes, MouseEvent } from 'react';

import { selectPrefillingNodeByActiveNode } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';

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
	prerequisiteNode?: Node;
	searchTerm?: string;
}

function PrefillMappingParentListItemBase({
	childrenListItemData,
	label: prop_label = 'Parent Label',
	prerequisiteNode,
	searchTerm,
	...props
}: PrefillMappingParentListItemProps) {
	const label = useMemo(
		() => (prerequisiteNode ? prerequisiteNode.data.name : prop_label),
		[prerequisiteNode, prop_label],
	);

	const prefillingNodeByActiveNode = useTypedSelector(
		selectPrefillingNodeByActiveNode,
	);

	const prefillingNodeIsActive = useMemo(
		() =>
			prefillingNodeByActiveNode !== undefined &&
			prefillingNodeByActiveNode.id === prerequisiteNode?.id,
		[prefillingNodeByActiveNode, prerequisiteNode?.id],
	);

	const [childrenListExpanded, setChildrenListExpanded] = useState(
		prefillingNodeIsActive,
	);

	const handleParentLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			setChildrenListExpanded(!childrenListExpanded);

			_e.stopPropagation();
		},
		[childrenListExpanded],
	);

	return (
		<li onClick={handleParentLIOnClick} {...props}>
			<Col className="flex-1">
				<Row
					className={clsx(
						classes.parentRow,
						prefillingNodeIsActive && classes.expandedParentRow,
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
							prerequisiteNode={prerequisiteNode}
							searchTerm={searchTerm}
						/>
					</Row>
				)}
			</Col>
		</li>
	);
}

const PrefillMappingParentListItem = memo(PrefillMappingParentListItemBase);

export default PrefillMappingParentListItem;
