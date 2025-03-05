import { memo, useCallback } from 'react';

import clsx from 'clsx';

import type { ColProps } from '@/components/layout/FlexComponents';
import type { ReactNode } from 'react';

import { Col, Row } from '@/components/layout/FlexComponents';

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
		rounded-sm 
		pointer-events-auto
	`,
} as const;

export interface ModalProps {
	bodyClassName: ColProps['className'];
	children: ReactNode;
	isVisible: boolean;
	handleClose: () => void;
}

function ModalBase({
	bodyClassName,
	children,
	handleClose,
	isVisible,
}: ModalProps) {
	const handleBodyOnClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
		},
		[],
	);

	return (
		isVisible && (
			<Row
				className={clsx(classes.backdrop)}
				childrenVerticalPosition="center"
				childrenHorizontalPosition="center"
				onClick={handleClose}
			>
				<Col
					className={clsx(classes.body, bodyClassName)}
					onClick={handleBodyOnClick}
				>
					{children}
				</Col>
			</Row>
		)
	);
}

const Modal = memo(ModalBase);

export default Modal;
