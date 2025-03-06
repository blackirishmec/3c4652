import { memo, useCallback } from 'react';

import { PiXFill } from 'react-icons/pi';

import type { ModalProps } from '@/components/modal/Modal';

import { resetClickedNodeId } from '@/redux/features/ui/flow';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import Button from '@/components/button/Button';
import { Col, Row } from '@/components/layout/FlexComponents';
import PrefillMappingListCol from '@/components/list/PrefillMappingListCol';
import Modal from '@/components/modal/Modal';

export interface PrefillMappingModalProps
	extends Omit<ModalProps, 'bodyClassName' | 'children'> {}

function PrefillMappingModalBase({ ...props }: PrefillMappingModalProps) {
	const dispatch = useAppDispatch();

	const clickedNode = useTypedSelector(selectClickedNode);

	const handleCloseModal = useCallback(() => {
		dispatch(resetClickedNodeId());
	}, [dispatch]);

	if (clickedNode === undefined) return null;

	const clickedNodeName = clickedNode.data.name;

	return (
		<Modal
			handleClose={props.handleClose}
			isVisible={props.isVisible}
			bodyClassName="w-155"
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
			<Row className="py-3 px-4 border-b border-gray-300 font-medium">
				Select data element to map
			</Row>
			<Row className="">
				<PrefillMappingListCol />
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
