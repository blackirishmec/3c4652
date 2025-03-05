import { memo } from 'react';

import type { ModalProps } from './Modal';
import type { AvantosForm, AvantosNode } from '../../nodes/types';

import Modal from './Modal';
import { Col, Row } from '../layout/FlexComponents';

export interface PrefillModalProps extends Omit<ModalProps, 'bodyClassName'> {
	node?: AvantosNode;
	form?: AvantosForm;
}

function PrefillModalBase({ node, form, ...props }: PrefillModalProps) {
	const Rows = () => {
		form?.ui_schema.elements.forEach(element => element.labe);
	};

	return (
		node !== undefined && (
			<Modal {...props} bodyClassName="w-175">
				<Row className="py-3 px-4 border-b">
					<Col className="flex-1">{node.data.name}</Col>
					<Col>X</Col>
				</Row>
				<Row className="pt-3 px-4">
					<Col className="flex-1">
						<Row className="font-semibold">Prefill</Row>
						<Row>Prefill fields for this form</Row>
					</Col>
					<Col childrenVerticalPosition="center">I/O</Col>
				</Row>
				<Row className="pt-8 px-4">
					<Col>
						<Row>Field Row A</Row>
						<Row>Field Row B</Row>
						<Row>Field Row C</Row>
					</Col>
				</Row>
				<Row className="py-3" childrenHorizontalPosition="center">
					Button
				</Row>
			</Modal>
		)
	);
}

const PrefillModal = memo(PrefillModalBase);

export default PrefillModal;
