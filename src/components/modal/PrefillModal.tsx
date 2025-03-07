import { memo, useCallback, useMemo } from 'react';

import { PiToggleLeft, PiToggleRightFill, PiXFill } from 'react-icons/pi';

import type { ModalProps } from '@/components/modal/Modal';

import { updateNode } from '@/redux/features/model/nodes';
import {
	resetActiveNodeFormFieldPropertyKey,
	resetActiveNodeId,
	selectActiveNodeFormFieldPropertyKey,
} from '@/redux/features/ui/flow';
import { selectFormFieldSchemaPropertiesArrayByActiveNode } from '@/redux/selectors/relationships/formRelationshipSelectors';
import {
	selectActiveNode,
	selectPrefillingEnabledByActiveNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import Button from '@/components/button/Button';
import { Col, Row } from '@/components/layout/FlexComponents';
import FormFieldRow from '@/components/layout/FormFieldRow';
import Modal from '@/components/modal/Modal';
import PrefillMappingModal from '@/components/modal/PrefillMappingModal';

export interface PrefillModalProps
	extends Omit<ModalProps, 'bodyClassName' | 'children'> {}

function PrefillModalBase({ ...props }: PrefillModalProps) {
	const dispatch = useAppDispatch();

	const activeNode = useTypedSelector(selectActiveNode);
	const formFieldSchemaPropertiesArrayByActiveNode = useTypedSelector(
		selectFormFieldSchemaPropertiesArrayByActiveNode,
	);
	const activeNodeFormFieldPropertyKey = useTypedSelector(
		selectActiveNodeFormFieldPropertyKey,
	);
	const prefillingEnabledByActiveNode = useTypedSelector(
		selectPrefillingEnabledByActiveNode,
	);

	const handleClosePrefillMappingModal = useCallback(() => {
		dispatch(resetActiveNodeFormFieldPropertyKey());
	}, [dispatch]);

	const prefillMappingModalIsVisible = useMemo(
		() => activeNodeFormFieldPropertyKey !== undefined,
		[activeNodeFormFieldPropertyKey],
	);

	const Rows = useMemo(
		() =>
			activeNode !== undefined &&
			formFieldSchemaPropertiesArrayByActiveNode.map(property => {
				return <FormFieldRow key={property.key} property={property} />;
			}),
		[formFieldSchemaPropertiesArrayByActiveNode, activeNode],
	);

	const handleCloseModal = useCallback(() => {
		dispatch(resetActiveNodeId());
	}, [dispatch]);

	const handlePrefillToggleOnClick = useCallback(() => {
		if (activeNode === undefined) return;

		dispatch(
			updateNode({
				id: activeNode.id,
				changes: {
					data: {
						...activeNode.data,
						prefill_enabled: !activeNode.data.prefill_enabled,
					},
				},
			}),
		);
	}, [activeNode, dispatch]);

	if (activeNode === undefined) return null;

	const clickedNodeName = activeNode.data.name;

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
							className="text-red-400 hover:text-red-500"
							size={24}
						/>
					</Button>
				</Col>
			</Row>
			<Row className="pt-3 px-4">
				<Col className="flex-1">
					<Row className="font-semibold">Prefill</Row>
					<Row childrenVerticalPosition="center">
						<Col className="flex-1">
							Prefill fields for this form
						</Col>
						<Col>
							{prefillingEnabledByActiveNode ? (
								<PiToggleRightFill
									className="text-blue-500 hover:text-gray-500 rounded-xl cursor-pointer"
									size={40}
									onClick={handlePrefillToggleOnClick}
								/>
							) : (
								<PiToggleLeft
									className="text-gray-500 hover:text-blue-500 rounded-xl cursor-pointer"
									size={40}
									onClick={handlePrefillToggleOnClick}
								/>
							)}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="pt-8 px-4">
				<Col className="flex-1 space-y-4">{Rows}</Col>
			</Row>
			<Row className="py-3" childrenHorizontalPosition="center">
				<Button
					className="border border-red-400 text-red-500 py-2 px-3 rounded-sm hover:bg-red-100! hover:border-red-500"
					onClick={handleCloseModal}
				>
					Close
				</Button>
			</Row>
			<PrefillMappingModal
				isVisible={prefillMappingModalIsVisible}
				handleClose={handleClosePrefillMappingModal}
			/>
		</Modal>
	);
}

const PrefillModal = memo(PrefillModalBase);

export default PrefillModal;
