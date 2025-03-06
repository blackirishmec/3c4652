import { useEffect, useState } from 'react';

import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';

import { edgeTypes, nodeTypes } from './types/AvantosTypes';

import {
	onConnect,
	onEdgesChange,
	selectAllEdges,
} from '@/redux/features/model/edges';
import { selectAllForms } from '@/redux/features/model/forms';
import { onNodesChange, selectAllNodes } from '@/redux/features/model/nodes';
import { fetchFlowData } from '@/redux/features/ui/flow/thunks';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import Logger from '@/utilities/Logger';

import PrefillModal from '@/components/modal/PrefillModal';

export default function App() {
	const dispatch = useAppDispatch();

	const nodes = useTypedSelector(selectAllNodes);
	const edges = useTypedSelector(selectAllEdges);
	const forms = useTypedSelector(selectAllForms);

	// Trigger data fetching on component mount.
	useEffect(() => {
		dispatch(fetchFlowData())
			.unwrap()
			.catch(reason =>
				Logger.errorObject('reason', reason, 'src/App.tsx:49'),
			);
	}, [dispatch]);

	const [prefillNode, setPrefillNode] = useState<Node>();
	const [prefillForm, setPrefillForm] = useState<Form>();

	const handleCloseModal = () => {
		setPrefillNode(undefined);
		setPrefillForm(undefined);
	};

	const handleOpenModal = (node: Node) => {
		setPrefillNode(node);
		setPrefillForm(
			forms?.find(form => form.id === node?.data.component_id),
		);
	};

	return (
		<ReactFlow
			nodes={nodes}
			nodeTypes={nodeTypes}
			onNodesChange={onNodesChange}
			edges={edges}
			edgeTypes={edgeTypes}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			fitView
			onNodeClick={(_event, node) => {
				handleOpenModal(node);
			}}
		>
			<Background />
			<MiniMap />
			<Controls />
			<PrefillModal
				isVisible={prefillNode !== undefined}
				handleClose={handleCloseModal}
				node={prefillNode}
				form={prefillForm}
			/>
		</ReactFlow>
	);
}
