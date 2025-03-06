import { memo } from 'react';

import clsx from 'clsx';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import type { InputHTMLAttributes } from 'react';

import { Col, Row } from '../../layout/FlexComponents';

const inputRowStyles = `
	border 
	rounded-sm 
	border-solid
	border-gray-300 
	py-1 
	px-3
	h-[56]
	w-full 
	bg-white
	text-base 
	focus:bg-blue-100!
	focus-visible:outline-0
    data-[has-error=true]:border-dotted!
    data-[has-error=false]:border-solid!
`;

interface InputRowProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean;
}

function InputRowBase({ className = '', isValid, ...props }: InputRowProps) {
	return (
		<Row
			data-has-error={isValid === false}
			className={clsx(inputRowStyles, className)}
		>
			<Col childrenVerticalPosition="center">
				<PiMagnifyingGlassBold color="gray" size={18} />
			</Col>
			<Col className="flex-1 pl-1.5">
				<input className="outline-0" {...props} />
			</Col>
		</Row>
	);
}

const InputRow = memo(InputRowBase) as typeof InputRowBase;

export default InputRow;
