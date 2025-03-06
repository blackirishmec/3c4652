import { memo, useMemo } from 'react';

import clsx from 'clsx';
import { PiDatabase, PiXCircleFill } from 'react-icons/pi';

import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { createSelectClickedNodeFormField } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';

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
	property: AvantosFieldSchemaPropertiesArrayValue;
}

function FormFieldRowBase({ property }: FormFieldRowProps) {
	const selectClickedNodeFormField = useMemo(
		() => createSelectClickedNodeFormField(property.key),
		[property.key],
	);
	const clickedNodeFormField = useTypedSelector(selectClickedNodeFormField);

	const prefilled = clickedNodeFormField !== undefined;

	const handleFormFieldRowOnClick = () => {};

	return (
		<Row
			className={clsx(
				classes.containerRow,
				prefilled && classes.prefilledContainerRow,
			)}
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
				{property.key}
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
