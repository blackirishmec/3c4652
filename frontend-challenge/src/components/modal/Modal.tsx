import clsx from 'clsx';
import { memo } from 'react';

import type { ReactNode } from 'react';

import { Col, Row } from '../layout/FlexComponents';

export interface ModalProps {
	children: ReactNode;
	isVisible: boolean;
	handleClose: () => void;
}

const classes = {
	backdrop: `
		fixed 
		z-10 
		top-0 
		left-0 
		h-[100%] 
		w-[100%] 
		bg-[rgba(179,235,255,0.5)]
	`,
	body: `
		bg-white 
		p-4 
		rounded-sm 
		pointer-events-none
	`,
} as const;

function ModalBase({ children, handleClose, isVisible }: ModalProps) {
	return (
		isVisible && (
			<Row
				className={clsx(classes.backdrop)}
				childrenVerticalPosition="center"
				childrenHorizontalPosition="center"
				onClick={handleClose}
			>
				<Col className={clsx(classes.body)} onClick={undefined}>
					{children}
				</Col>
			</Row>
		)
	);
}

const Modal = memo(ModalBase);

export default Modal;
