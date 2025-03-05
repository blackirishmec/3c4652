import uuid4 from 'uuid4';

import type { Edge } from '@/interfaces/models/edgeModels';
import type { EdgeResource } from '@/interfaces/resources/edgeResources';

// *** Can be updated to destructure the transformation result
export type TransformEdgeResourceResult = {
	edge: Edge;
};
export function transformEdgeResource(
	passedEdgeResource: EdgeResource,
): TransformEdgeResourceResult {
	return {
		edge: {
			id: uuid4(),
			source: passedEdgeResource.source,
			target: passedEdgeResource.target,
		},
	};
}

// *** Can be updated to destructure the transformation results
export type TransformEdgeResourcesResult = {
	edges: Edge[];
};
export function transformEdgeResources(
	passedEdgeResources: EdgeResource[],
): TransformEdgeResourcesResult {
	return passedEdgeResources.reduce<TransformEdgeResourcesResult>(
		(acc, resource) => {
			const { edge } = transformEdgeResource(resource);
			return {
				edges: [...acc.edges, edge],
			};
		},
		{ edges: [] },
	);
}
