import { memo, useCallback } from 'react';

import { PiXFill } from 'react-icons/pi';

import type { ModalProps } from '@/components/modal/Modal';
import type { RootState } from '@/redux/store';

import { selectNodeById } from '@/redux/features/model/nodes';
import { selectClickedNodeFormField } from '@/redux/features/ui/flow';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import Button from '@/components/button/Button';
import { Col, Row } from '@/components/layout/FlexComponents';
import PrefillMappingParentListCol from '@/components/list/PrefillMappingParentListCol';
import Modal from '@/components/modal/Modal';

export interface PrefillMappingModalProps
	extends Omit<ModalProps, 'bodyClassName' | 'children'> {
	clickedNodeFormFieldSchemaPropertyKey: string | undefined;
}

function PrefillMappingModalBase({
	clickedNodeFormFieldSchemaPropertyKey,
	...props
}: PrefillMappingModalProps) {
	const clickedNode = useTypedSelector(selectClickedNode);
	const clickedNodeFormField = useTypedSelector(selectClickedNodeFormField);
	const clickedParentNode = useTypedSelector((state: RootState) =>
		selectNodeById(state, clickedNodeFormField?.prefillingNodeId ?? ''),
	);

	const handleCloseModal = useCallback(() => {
		props.handleClose();
	}, [props]);

	if (clickedNode === undefined) return null;

	const clickedNodeName = clickedNode.data.name;

	return (
		<Modal
			handleClose={props.handleClose}
			isVisible={props.isVisible}
			bodyClassName="w-155 h-175"
		>
			<Row className="py-3 px-4 border-b">
				<Col className="flex-1">{`${clickedNodeName}.${clickedNodeFormFieldSchemaPropertyKey}`}</Col>
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
			<Row className="py-3 px-4 border-b border-gray-300 font-medium">
				<Col className="flex-1">Select data element to map</Col>
				{clickedParentNode !== undefined && (
					<Col>
						<Row className="flex-1">
							<Col className="bg-blue-100">
								{clickedParentNode?.data.name}
							</Col>
							{clickedNodeFormField && (
								<Col className="bg-green-100">
									{`.${clickedNodeFormField?.nodeFormFieldSchemaPropertyKey}`}
								</Col>
							)}
						</Row>
					</Col>
				)}
			</Row>
			<Row className="flex-1 min-h-0">
				<PrefillMappingParentListCol />
				<Col className="flex-1 w-50" />
			</Row>
			<Row
				className=" border-t border-gray-300 space-x-2 py-3 px-2"
				childrenHorizontalPosition="end"
			>
				<Col>
					<Button
						className="border border-blue-400 text-blue-500 py-2 px-3 rounded-sm hover:bg-blue-100!"
						onClick={handleCloseModal}
					>
						Cancel
					</Button>
				</Col>
				<Col>
					<Button
						className="border border-red-400 text-red-500 py-2 px-3 rounded-sm hover:bg-blue-100!"
						onClick={handleCloseModal}
						disabled={clickedNodeFormField === undefined}
					>
						Select
					</Button>
				</Col>
			</Row>
		</Modal>
	);
}

const PrefillMappingModal = memo(PrefillMappingModalBase);

export default PrefillMappingModal;
