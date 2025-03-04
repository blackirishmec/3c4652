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
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-named-as-default
import uuid4 from 'uuid4';

import '@xyflow/react/dist/style.css';

import type { AvantosNode } from './nodes/types';
import type { Edge, OnConnect } from '@xyflow/react';

import { edgeTypes } from './edges';
import { nodeTypes } from './nodes';

export interface AvantosEdge extends Edge {
	source: string;
	target: string;
}

export default function App() {
	const [nodesB, setNodesB, onNodesBChange] = useNodesState<AvantosNode>([]);
	const [edgesB, setEdgesB, onEdgesBChange] = useEdgesState<AvantosEdge>([]);

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
			const transformedNodes = data.nodes.map<AvantosNode>(
				(node: AvantosNode) => ({
					id: node.id,
					data: node.data,
					position: node.position,
					type: node.type,
				}),
			);

			const transformedEdges = data.edges.map<AvantosEdge>(
				(edge: AvantosEdge) => ({
					id: uuid4(),
					source: edge.source,
					target: edge.target,
				}),
			);

			// Update state with the transformed data.
			setNodesB(transformedNodes);
			setEdgesB(transformedEdges);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error fetching flow data:', error);
		}
	}, [setNodesB, setEdgesB]);

	// Trigger data fetching on component mount.
	useEffect(() => {
		const fetchFromApi = async () => {
			await fetchFlowData();
		};

		fetchFromApi().catch(reason => {
			// eslint-disable-next-line no-console
			console.log('reason', reason);
		});
	}, [fetchFlowData]);

	const onConnectB: OnConnect = useCallback(
		connection => setEdgesB(edgesValue => addEdge(connection, edgesValue)),
		[setEdgesB],
	);

	return (
		<ReactFlow
			nodes={nodesB}
			nodeTypes={nodeTypes}
			onNodesChange={onNodesBChange}
			edges={edgesB}
			edgeTypes={edgeTypes}
			onEdgesChange={onEdgesBChange}
			onConnect={onConnectB}
			fitView
		>
			<Background />
			<MiniMap />
			<Controls />
		</ReactFlow>
	);

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
