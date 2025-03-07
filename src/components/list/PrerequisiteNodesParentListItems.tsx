import { memo } from 'react';

import { selectActiveNodePrerequisiteNodes } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import ParentListItem from '@/components/list/prefill-mapping/ParentListItem';

function PrerequisiteNodesParentListItemsBase() {
	const activeNodePrerequisiteNodes = useTypedSelector(
		selectActiveNodePrerequisiteNodes,
	);

	return activeNodePrerequisiteNodes
		.map(activeNodePrerequisiteNode => (
			<ParentListItem
				prefilledNode={activeNodePrerequisiteNode}
				key={activeNodePrerequisiteNode.id}
			/>
		))
		.reverse();
}

const PrerequisiteNodesParentListItems = memo(
	PrerequisiteNodesParentListItemsBase,
);

export default PrerequisiteNodesParentListItems;
