import type { Node } from '@/interfaces/models/nodeModels';

export interface ExploreNodePrerequisites {
	node: Node;
	nodeEntities: Record<string, Node>;
}
const exploreNodePrerequisites = ({
	node,
	nodeEntities,
}: ExploreNodePrerequisites): Node[] => {
	if (!node.data.prerequisites) return [];

	const visitedNodeIds = new Set<Node['id']>();

	const clickedNodeParents: Node[] = [];

	node.data.prerequisites
		.filter(prerequisiteId => !visitedNodeIds.has(prerequisiteId))
		.forEach(prerequisiteId => {
			const prerequisiteNode = nodeEntities[prerequisiteId];
			if (prerequisiteNode !== undefined) {
				visitedNodeIds.add(prerequisiteId);
				clickedNodeParents.push(prerequisiteNode);
				exploreNodePrerequisites({
					node: prerequisiteNode,
					nodeEntities,
				});
			}
		});

	return clickedNodeParents;
};

export default exploreNodePrerequisites;
