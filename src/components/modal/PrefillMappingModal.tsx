import { memo, useCallback } from 'react';

import { PiXFill } from 'react-icons/pi';

import type { ModalProps } from '@/components/modal/Modal';

import {
	selectActiveNodeFormFieldPropertyKey,
	selectActivePrefillingParentIdentifier,
} from '@/redux/features/ui/flow';
import { saveSelectedPrefillMapping } from '@/redux/features/ui/flow/thunks';
import {
	selectPrefillingChildIdentifierByActiveNode,
	selectPrefillingParentModelLabelByActiveNode,
} from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import { selectActiveNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import Button from '@/components/button/Button';
import { Col, Row } from '@/components/layout/FlexComponents';
import ParentListCol from '@/components/list/prefill-mapping/ParentListCol';
import Modal from '@/components/modal/Modal';

export interface PrefillMappingModalProps
	extends Omit<ModalProps, 'bodyClassName' | 'children'> {}

function PrefillMappingModalBase({ ...props }: PrefillMappingModalProps) {
	const dispatch = useAppDispatch();

	const activeNode = useTypedSelector(selectActiveNode);
	const activeNodeFormFieldPropertyKey = useTypedSelector(
		selectActiveNodeFormFieldPropertyKey,
	);

	const activePrefillingParentIdentifier = useTypedSelector(
		selectActivePrefillingParentIdentifier,
	);

	const prefillingParentLabelByActiveNode = useTypedSelector(
		selectPrefillingParentModelLabelByActiveNode,
	);

	const prefillingChildIdentifierByActiveNode = useTypedSelector(
		selectPrefillingChildIdentifierByActiveNode,
	);

	const handleCloseModal = useCallback(() => {
		props.handleClose();
	}, [props]);

	const handleSaveSelectedPrefillMapping = useCallback(() => {
		dispatch(saveSelectedPrefillMapping())
			.unwrap()
			.catch(reason => console.log('reason', reason));

		handleCloseModal();
	}, [dispatch, handleCloseModal]);

	if (activeNode === undefined) return null;

	const activeNodeName = activeNode.data.name;

	return (
		<Modal
			handleClose={props.handleClose}
			isVisible={props.isVisible}
			bodyClassName="w-155 h-175"
		>
			<Row className="py-3 px-4 border-b">
				<Col className="flex-1">{`${activeNodeName}.${activeNodeFormFieldPropertyKey}`}</Col>
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
				{prefillingParentLabelByActiveNode !== undefined && (
					<Col>
						<Row className="flex-1">
							<Col className="bg-blue-100">
								{prefillingParentLabelByActiveNode}
							</Col>
							{prefillingChildIdentifierByActiveNode !==
								undefined && (
								<Col className="bg-green-100">
									{`.${prefillingChildIdentifierByActiveNode}`}
								</Col>
							)}
						</Row>
					</Col>
				)}
			</Row>
			<Row className="flex-1 min-h-0">
				<ParentListCol />
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
						onClick={handleSaveSelectedPrefillMapping}
						disabled={
							activePrefillingParentIdentifier === undefined
						}
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
