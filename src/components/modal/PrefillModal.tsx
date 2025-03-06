import { memo, useMemo } from 'react';

import uuid4 from 'uuid4';

import type { ModalProps } from '@/components/modal/Modal';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';

import { Col, Row } from '@/components/layout/FlexComponents';
import FormFieldRow from '@/components/layout/FormFieldRow';
import Modal from '@/components/modal/Modal';

export interface PrefillModalProps
	extends Omit<ModalProps, 'bodyClassName' | 'children'> {}

function PrefillModalBase({ ...props }: PrefillModalProps) {
	// TODO: {Wed, 03/05/25 @22:27} => Select form via formRelationshipSelectors->selectFormByClickedNode()
	// const form =

	// TODO: {Wed, 03/05/25 @00:05} => I think that JSON Forms might help traverse the data retrieved from the avantos server. For Instance I think I need to cross reference form.field_schema and form.ui_schema
	const Rows = useMemo(
		() =>
			form?.ui_schema.elements.map((element, index) => (
				<FormFieldRow
					key={uuid4()}
					element={element}
					prefilled={!!(index % 2)}
				/>
			)),
		// form?.field_schema.properties &&
		// Object.keys(form?.field_schema.properties).map(property => (
		// 	<FormFieldRow element={property} />
		// )),
		[form],
	);

	return (
		node !== undefined && (
			<Modal
				handleClose={props.handleClose}
				isVisible={props.isVisible}
				bodyClassName="w-175"
			>
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
					<Col className="flex-1 space-y-4">{Rows}</Col>
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
