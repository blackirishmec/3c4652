import { memo, useCallback, useMemo } from 'react';

import { PiXFill } from 'react-icons/pi';
import uuid4 from 'uuid4';

import type { ModalProps } from '@/components/modal/Modal';
import type { Node } from '@/interfaces/models/nodeModels';
import type { AvantosFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { resetClickedNodeId } from '@/redux/features/ui/flow';
import { selectClickedFormFieldSchemaPropertiesArray } from '@/redux/selectors/relationships/formRelationshipSelectors';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import Button from '@/components/button/Button';
import { Col, Row } from '@/components/layout/FlexComponents';
import FormFieldRow from '@/components/layout/FormFieldRow';
import Modal from '@/components/modal/Modal';

export interface PrefillModalProps
	extends Omit<ModalProps, 'bodyClassName' | 'children'> {}

function PrefillModalBase({ ...props }: PrefillModalProps) {
	// Node -> Form -> Field (form.field_schema.property) -> Prefill Field (form.field_schema.property)

	const dispatch = useAppDispatch();

	const clickedNode = useTypedSelector(selectClickedNode);
	const clickedFormFieldSchemaPropertiesArray = useTypedSelector(
		selectClickedFormFieldSchemaPropertiesArray,
	);

	// TODO: {Wed, 03/05/25 @00:05} => I think that JSON Forms might help traverse the data retrieved from the avantos server. For Instance I think I need to cross reference form.field_schema and form.ui_schema
	const Rows = useMemo(
		() =>
			clickedFormFieldSchemaPropertiesArray.map((property, index) => (
				<FormFieldRow
					key={uuid4()}
					property={property}
					prefilled={!!(index % 2)}
				/>
			)),
		[clickedFormFieldSchemaPropertiesArray],
	);

	const handleCloseModal = useCallback(() => {
		dispatch(resetClickedNodeId());
	}, [dispatch]);

	if (clickedNode === undefined) return null;

	const clickedNodeName = clickedNode.data.name;

	return (
		<Modal
			handleClose={props.handleClose}
			isVisible={props.isVisible}
			bodyClassName="w-175"
		>
			<Row className="py-3 px-4 border-b">
				<Col className="flex-1">{clickedNodeName}</Col>
				<Col>
					<Button
						className="hover:bg-red-100"
						onClick={handleCloseModal}
					>
						<PiXFill
							className="text-red-400 hover:text-red-300"
							size={24}
						/>
					</Button>
				</Col>
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
				<Button
					className="bg-red-400 text-white py-2 px-3 rounded-full hover:bg-red-300"
					onClick={handleCloseModal}
				>
					Close{' '}
				</Button>
			</Row>
		</Modal>
	);
}

const PrefillModal = memo(PrefillModalBase);

export default PrefillModal;
