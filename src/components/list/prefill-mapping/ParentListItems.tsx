import { memo } from 'react';

import { selectActiveNodePrerequisiteNodes } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import ParentListItem from '@/components/list/ParentListItem';

function ParentListItemsBase() {
	const activeNodePrerequisiteNodes = useTypedSelector(
		selectActiveNodePrerequisiteNodes,
	);

	return activeNodePrerequisiteNodes
		.map(activeNodePrerequisiteNode => (
			<ParentListItem
				key={activeNodePrerequisiteNode.id}
				prefillingNode={activeNodePrerequisiteNode}
			/>
		))
		.reverse();
}

const ParentListItems = memo(ParentListItemsBase);

export default ParentListItems;
