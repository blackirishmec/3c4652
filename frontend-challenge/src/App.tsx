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

import type { Edge, Node, OnConnect } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export interface AvantosNodeData extends Record<string, unknown> {
	approval_required: boolean;
	approval_roles: string[];
	component_id: string;
	component_key: string;
	component_type: AvantosNodeType;
	id: string;
	input_mapping: Record<string, object>;
	name: string;
	permitted_roles: string[] | null;
	prerequisites: string[] | null;
	sla_duration?: {
		number: number;
		unit: 'minutes' | 'hours' | 'days';
	};
}

export type AvantosNodeType = 'form' | 'branch' | 'trigger' | 'configuration';

export type AvantosNode = Node<AvantosNodeData, AvantosNodeType>;

export interface AvantosEdge extends Edge {
	source: string;
	target: string;
}

export default function App() {
	// const [nodes, _, onNodesChange] = useNodesState(initialNodes);
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const [nodesB, setNodesB, onNodesBChange] = useNodesState<AvantosNode>([]);
	const [edgesB, setEdgesB, onEdgesBChange] = useEdgesState<AvantosEdge>([]);

	// const onConnect: OnConnect = useCallback(
	// 	connection => setEdges(edgesValue => addEdge(connection, edgesValue)),
	// 	[setEdges],
	// );

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
			console.error('Error fetching flow data:', error);
		}
	}, [setNodesB, setEdgesB]);

	// Trigger data fetching on component mount.
	useEffect(() => {
		const fetchFromApi = async () => {
			await fetchFlowData();
		};

		fetchFromApi().catch(reason => {
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
			// nodeTypes={nodeTypes}
			onNodesChange={onNodesBChange}
			edges={edgesB}
			// edgeTypes={edgeTypes}
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
