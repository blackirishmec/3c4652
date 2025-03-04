import { useCallback, useEffect } from 'react';

import {
	addEdge,
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';

import type { Edge, Node, OnConnect } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { edgeTypes, initialEdges } from './edges';
import { initialNodes, nodeTypes } from './nodes';

import type { AppNode } from './nodes/types';

// Define a custom type for node data.
interface CustomNodeData extends Record<string, unknown> {
	label: string;
}

// Extend React Flow types for strict typing.
export interface CustomNode extends Node<CustomNodeData> {}
export interface CustomEdge extends Edge {}

export default function App() {
	const [nodes, _, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const onConnect: OnConnect = useCallback(
		connection => setEdges(edgesValue => addEdge(connection, edgesValue)),
		[setEdges],
	);

	const fetchFlowData = useCallback(
		async () => {
			try {
				const response = await fetch(
					'http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
				);
				if (!response.ok) {
					throw new Error(`HTTP error: ${response.status}`);
				}
				const data = await response.json();

				// Validate and transform API response into React Flow format.
				const transformedNodes: AppNode[] = data.nodes.map(
					(node: any) => ({
						id: node.id,
						data: { label: node.label },
						position: { x: node.x, y: node.y },
						type: node.type || 'default',
					}),
				);

				const transformedEdges: CustomEdge[] = data.edges.map(
					(edge: any) => ({
						id: edge.id,
						source: edge.source,
						target: edge.target,
						type: edge.type || 'default',
					}),
				);

				// Update state with the transformed data.
				// setNodesB(transformedNodes);
				// setEdgesB(transformedEdges);
			} catch (error) {
				console.error('Error fetching flow data:', error);
			}
		},
		[
			// setNodesB,
			//  setEdgesB
		],
	);

	// Trigger data fetching on component mount.
	useEffect(() => {
		const fetchFromApi = async () => {
			await fetchFlowData();
		};

		fetchFromApi().catch(reason => {
			console.log('reason', reason);
		});
	}, [fetchFlowData]);

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
		>
			<Background />
			<MiniMap />
			<Controls />
		</ReactFlow>
	);

	// const [nodesB, setNodesB, onNodesBChange] = useNodesState<AppNode>([]);
	// const [edgesB, setEdgesB, onEdgesBChange] = useEdgesState<CustomEdge>([]);

	// const onConnect: OnConnect = useCallback(
	// 	connection => setEdgesB(edgesValue => addEdge(connection, edgesValue)),
	// 	[setEdgesB],
	// );

	// return (
	// 	<ReactFlow
	// 		nodes={nodesB}
	// 		nodeTypes={nodeTypes}
	// 		onNodesChange={onNodesBChange}
	// 		edges={edgesB}
	// 		edgeTypes={edgeTypes}
	// 		onEdgesChange={onEdgesBChange}
	// 		onConnect={onConnect}
	// 		fitView
	// 	>
	// 		<Background />
	// 		<MiniMap />
	// 		<Controls />
	// 	</ReactFlow>
	// );
}
