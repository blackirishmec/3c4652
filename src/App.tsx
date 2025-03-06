import { useCallback, useEffect, useMemo } from 'react';

import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import type { Node } from '@/interfaces/models/nodeModels';
import type { MouseEvent } from 'react';

import { edgeTypes, nodeTypes } from './types/AvantosTypes';

import {
	onConnect,
	onEdgesChange,
	selectAllEdges,
} from '@/redux/features/model/edges';
import { onNodesChange, selectAllNodes } from '@/redux/features/model/nodes';
import { resetClickedNodeId, setClickedNodeId } from '@/redux/features/ui/flow';
import { fetchFlowData } from '@/redux/features/ui/flow/thunks';
import { selectClickedNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import Logger from '@/utilities/Logger';

import PrefillModal from '@/components/modal/PrefillModal';

export default function App() {
	const dispatch = useAppDispatch();

	const nodes = useTypedSelector(selectAllNodes);
	const edges = useTypedSelector(selectAllEdges);
	const clickedNode = useTypedSelector(selectClickedNode);

	useEffect(() => {
		dispatch(fetchFlowData())
			.unwrap()
			.catch(reason =>
				Logger.errorObject('reason', reason, 'src/App.tsx:49'),
			);
	}, [dispatch]);

	const handleOpenModal = useCallback(
		(node: Node) => {
			dispatch(setClickedNodeId(node.id));
		},
		[dispatch],
	);

	const handleNodeClick = useCallback(
		(_event: MouseEvent<Element, globalThis.MouseEvent>, node: Node) => {
			handleOpenModal(node);
		},
		[handleOpenModal],
	);

	const modalIsVisible = useMemo(
		() => clickedNode !== undefined,
		[clickedNode],
	);

	const handleCloseModal = useCallback(() => {
		dispatch(resetClickedNodeId());
	}, [dispatch]);

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
			onNodeClick={handleNodeClick}
		>
			<Background />
			<MiniMap />
			<Controls />
			<PrefillModal
				isVisible={modalIsVisible}
				handleClose={handleCloseModal}
			/>
		</ReactFlow>
	);
}
