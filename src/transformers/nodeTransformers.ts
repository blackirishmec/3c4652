import type { Node } from '@/interfaces/models/nodeModels';
import type { EdgeResource } from '@/interfaces/resources/edgeResources';
import type { NodeResource } from '@/interfaces/resources/nodeResources';

// *** Can be updated to destructure the transformation result
export type TransformNodeResourceResult = {
	node: Node;
};
export interface TransformNodeResourceProps {
	nodeResource: NodeResource;
	edgeResources: EdgeResource[];
}
export function transformNodeResource({
	nodeResource,
	edgeResources,
}: TransformNodeResourceProps): TransformNodeResourceResult {
	const tempData = nodeResource.data;
	tempData.edge_to = edgeResources.some(
		edgeResource => edgeResource.target === nodeResource.id,
	);
	tempData.edge_from = edgeResources.some(
		edgeResource => edgeResource.source === nodeResource.id,
	);
	tempData.prefill_enabled = true;

	return {
		node: {
			id: nodeResource.id,
			data: tempData,
			position: nodeResource.position,
			type: nodeResource.type,
			discriminant: 'Node',
		},
	};
}

// *** Can be updated to destructure the transformation results
export type TransformNodeResourcesResult = {
	nodes: Node[];
};
export interface TransformNodeResourcesProps {
	nodeResources: NodeResource[];
	edgeResources: EdgeResource[];
}
export function transformNodeResources({
	nodeResources,
	edgeResources,
}: TransformNodeResourcesProps): TransformNodeResourcesResult {
	return nodeResources.reduce<TransformNodeResourcesResult>(
		(acc, resource) => {
			const { node } = transformNodeResource({
				nodeResource: resource,
				edgeResources,
			});
			return {
				nodes: [...acc.nodes, node],
			};
		},
		{ nodes: [] },
	);
}
