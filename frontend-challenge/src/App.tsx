import {
	addEdge,
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { default as uuid4 } from 'uuid4';

import '@xyflow/react/dist/style.css';

import type { AvantosNode } from './nodes/types';
import type { Edge, OnConnect } from '@xyflow/react';

import Modal from './components/modal/Modal';
import { edgeTypes } from './edges';
import { nodeTypes } from './nodes';

export interface AvantosEdge extends Edge {
	source: string;
	target: string;
}

export default function App() {
	const [nodes, setNodes, onNodesChange] = useNodesState<AvantosNode>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<AvantosEdge>([]);

	const [showModal, setShowModal] = useState<boolean>(true);
	const handleClose = () => {
		setShowModal(false);
	};

	const fetchFlowData = useCallback(async () => {
		try {
			const response = await fetch(
				'http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
			);
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data: {
				nodes: AvantosNode[];
				edges: AvantosEdge[];
			} = await response.json();

			// Validate and transform API response into React Flow format.
			const transformedEdges = data.edges.map<AvantosEdge>(
				(edge: AvantosEdge) => ({
					id: uuid4(),
					source: edge.source,
					target: edge.target,
				}),
			);

			const transformedNodes = data.nodes.map<AvantosNode>(
				(node: AvantosNode) => {
					const tempData = node.data;
					tempData.edgeTo = transformedEdges.some(
						transformedEdge => transformedEdge.target === node.id,
					);
					tempData.edgeFrom = transformedEdges.some(
						transformedEdge => transformedEdge.source === node.id,
					);

					return {
						id: node.id,
						data: tempData,
						position: node.position,
						type: node.type,
					};
				},
			);

			// Update state with the transformed data.
			setNodes(transformedNodes);
			setEdges(transformedEdges);
		} catch (error) {
			console.error('Error fetching flow data:', error);
		}
	}, [setNodes, setEdges]);

	// Trigger data fetching on component mount.
	useEffect(() => {
		fetchFlowData().catch(reason => console.log('Fetch error', reason));
	}, [fetchFlowData]);

	const onConnect: OnConnect = useCallback(
		connection => setEdges(edgesValue => addEdge(connection, edgesValue)),
		[setEdges],
	);

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
			onNodeClick={(event, node) => {}}
		>
			<Background />
			<MiniMap />
			<Controls />
			<Modal isVisible={showModal} handleClose={handleClose}>
				Test
			</Modal>
		</ReactFlow>
	);
}
