import { useCallback, useEffect, useState } from 'react';

import {
	addEdge,
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	useEdgesState,
} from '@xyflow/react';

import { Provider } from 'react-redux';
import uuid4 from 'uuid4';

import '@xyflow/react/dist/style.css';

import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { Edge } from '@/interfaces/models/edgeModels';
import type { Form } from '@/interfaces/models/formModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { OnConnect } from '@xyflow/react';

import { edgeTypes, nodeTypes } from './types/AvantosTypes';

import { selectAllNodes } from '@/redux/features/model/nodes';
import { store } from '@/redux/store';

import useTypedSelector from '@/hooks/useTypedSelector';

import PrefillModal from '@/components/modal/PrefillModal';

export default function App() {
	// TODO: {Wed, 03/05/25 @20:53} => Create a UI Slice with a thunk called fetchFlowData. Dispatch it here. Then save the id of the node selected by the user click to this new slice.

	const nodes = useTypedSelector(selectAllNodes);

	// useEffect(() => {
	// 	const dispatch = useAppDispatch(fetch);
	// }, [third])

	// const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

	const [forms, setForms] = useState<Form[]>();
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

	const fetchFlowData = useCallback(async () => {
		try {
			const response = await fetch(
				'http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
			);
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data: AvantosApiResponse =
				(await response.json()) as AvantosApiResponse;

			// Validate and transform API response into React Flow format.
			const transformedForms = data.forms.map<Form>((form: Form) => form);

			const transformedEdges = data.edges.map<Edge>((edge: Edge) => ({
				id: uuid4(),
				source: edge.source,
				target: edge.target,
			}));

			const transformedNodes = data.nodes.map<Node>((node: Node) => {
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
			});

			// Update state with the transformed data.
			setForms(transformedForms);
			setNodes(transformedNodes);
			setEdges(transformedEdges);
		} catch (error) {
			// console.error('Error fetching flow data:', error);
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
		<Provider store={store}>
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
		</Provider>
	);
}
