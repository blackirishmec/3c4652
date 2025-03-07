import type { Node } from '@/interfaces/models/nodeModels';

export interface ExploreNodePrerequisites {
	node: Node;
	nodeEntities: Record<string, Node>;
}

const exploreNodePrerequisites = (
	{ node, nodeEntities }: ExploreNodePrerequisites,
	visitedNodeIds: Set<Node['id']> = new Set(),
): Node[] => {
	if (!node?.data?.prerequisites || node.data.prerequisites.length === 0) {
		return [];
	}

	return node.data.prerequisites.reduce<Node[]>(
		(prerequisites, prerequisiteId) => {
			if (visitedNodeIds.has(prerequisiteId)) {
				return prerequisites;
			}

			const prefillingNode = nodeEntities[prerequisiteId];
			if (prefillingNode == null) {
				return prerequisites;
			}

			visitedNodeIds.add(prerequisiteId);

			return [
				...prerequisites,
				prefillingNode,
				...exploreNodePrerequisites(
					{ node: prefillingNode, nodeEntities },
					visitedNodeIds,
				),
			];
		},
		[],
	);
};

export default exploreNodePrerequisites;
