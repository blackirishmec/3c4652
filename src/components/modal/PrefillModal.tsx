import { memo, useCallback, useMemo } from 'react';

import { PiXFill } from 'react-icons/pi';
import uuid4 from 'uuid4';

import type { ModalProps } from '@/components/modal/Modal';

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
	const dispatch = useAppDispatch();

	const clickedNode = useTypedSelector(selectClickedNode);
	const clickedFormFieldSchemaPropertiesArray = useTypedSelector(
		selectClickedFormFieldSchemaPropertiesArray,
	);

	// TODO: {Wed, 03/05/25 @00:05} => I think that JSON Forms might help traverse the data retrieved from the avantos server. For Instance I think I need to cross reference form.field_schema and form.ui_schema
	const Rows = useMemo(
		() =>
			clickedFormFieldSchemaPropertiesArray.map(property => (
				<FormFieldRow key={uuid4()} property={property} />
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
					className="border border-red-400 text-red-500 py-2 px-3 rounded-sm hover:bg-blue-100!"
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
