import type { Node } from '@/interfaces/models/nodeModels';
import type { NodeResource } from '@/interfaces/resources/nodeResources';

// *** Can be updated to destructure the transformation result
export type TransformNodeResourceResult = {
	node: Node;
};
export function transformNodeResource(
	passedNodeResource: NodeResource,
): TransformNodeResourceResult {
	return { node: passedNodeResource };
}

// *** Can be updated to destructure the transformation results
export type TransformNodeResourcesResult = {
	nodes: Node[];
};
export function transformNodeResources(
	passedNodeResources: NodeResource[],
): TransformNodeResourcesResult {
	return passedNodeResources.reduce<TransformNodeResourcesResult>(
		(acc, resource) => {
			const { node } = transformNodeResource(resource);
			return {
				nodes: [...acc.nodes, node],
			};
		},
		{ nodes: [] },
	);
}
