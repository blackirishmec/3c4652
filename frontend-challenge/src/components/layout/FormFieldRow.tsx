import clsx from 'clsx';
import { memo } from 'react';
import { PiDatabase, PiXCircleFill } from 'react-icons/pi';

import type { AvantosUISchemaElement } from '../../nodes/types';

import { Col, Row } from './FlexComponents';

const classes = {
	containerRow: `
		rounded-sm 
		py-1 
		px-2 
		bg-gray-200 
		focus:border-blue-200
	`,
} as const;

export interface FormFieldRowProps {
	element: AvantosUISchemaElement;
}

function FormFieldRowBase({ element }: FormFieldRowProps) {
	return (
		<Row className={clsx(classes.containerRow)}>
			<Col childrenVerticalPosition="center">
				<PiDatabase className="text-xl" />
			</Col>
			<Col className="flex-1 pl-2">{element.label}</Col>
			<Col childrenVerticalPosition="center">
				<PiXCircleFill color="gray" />
			</Col>
		</Row>
	);
}

const FormFieldRow = memo(FormFieldRowBase);

export default FormFieldRow;
