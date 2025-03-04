import { useCallback } from 'react';

import {
	addEdge,
	Background,
	Controls,
	MiniMap,
	type OnConnect,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { edgeTypes, initialEdges } from './edges';
import { initialNodes, nodeTypes } from './nodes';

export default function App() {
	const [nodes, _, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
		>
			<Background />
			<MiniMap />
			<Controls />
		</ReactFlow>
	);
}
