import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiDatabase, PiXCircleFill } from 'react-icons/pi';

import type { RootState } from '@/redux/store';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectNodeById } from '@/redux/features/model/nodes';
import { setActiveNodeFormFieldPropertyKey } from '@/redux/features/ui/flow';
import { createSelectNodeFormFieldMappingByActiveNode } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from './FlexComponents';

const classes = {
	containerRow: `
		rounded-sm 
		py-1 
		px-2 
		bg-gray-100 
		border
		border-dashed
		border-gray-300
		hover:bg-blue-50
		hover:border-blue-500
		cursor-pointer
	`,
	prefilledContainerRow: `
		rounded-full!
		border-solid!
		border-gray-100!
		hover:border-gray-100!
		hover:bg-gray-100!
	`,
	label: `
		flex-1 
		pl-2
		text-gray-400
	`,
	prefilledLabel: `
		text-black!
	`,
} as const;

export interface FormFieldRowProps {
	property: FormFieldSchemaPropertiesArrayValue;
}

function FormFieldRowBase({ property }: FormFieldRowProps) {
	const dispatch = useAppDispatch();

	const selectNodeFormFieldMappingByActiveNode = useMemo(
		() => createSelectNodeFormFieldMappingByActiveNode(property.key),
		[property.key],
	);
	const nodeFormFieldMappingByActiveNode = useTypedSelector(
		selectNodeFormFieldMappingByActiveNode,
	);

	const prefillingNode = useTypedSelector((state: RootState) =>
		selectNodeById(
			state,
			nodeFormFieldMappingByActiveNode?.prefillingNodeId ?? '',
		),
	);

	const handleOnClick = useCallback(() => {
		dispatch(setActiveNodeFormFieldPropertyKey(property.key));
	}, [dispatch, property.key]);

	const prefilled = nodeFormFieldMappingByActiveNode !== undefined;

	return (
		<Row
			className={clsx(
				classes.containerRow,
				prefilled && classes.prefilledContainerRow,
			)}
			onClick={handleOnClick}
		>
			{!prefilled && (
				<Col childrenVerticalPosition="center">
					<PiDatabase className="text-xl" />
				</Col>
			)}
			<Col
				className={clsx(
					classes.label,
					prefilled && classes.prefilledLabel,
				)}
			>
				{`${property.key}${
					prefillingNode !== undefined &&
					nodeFormFieldMappingByActiveNode !== undefined
						? `: ${prefillingNode.data.name}.${nodeFormFieldMappingByActiveNode.prefillingNodeFormFieldSchemaPropertyKey}`
						: ''
				}`}
			</Col>
			{prefilled && (
				<Col childrenVerticalPosition="center">
					<PiXCircleFill color="gray" />
				</Col>
			)}
		</Row>
	);
}

const FormFieldRow = memo(FormFieldRowBase);

export default FormFieldRow;
