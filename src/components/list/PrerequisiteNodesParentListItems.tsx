import { memo } from 'react';

import { selectActiveNodePrerequisiteNodes } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import PrefillMappingParentListItem from '@/components/list/PrefillMappingParentListItem';

function PrerequisiteNodesParentListItemsBase() {
	const activeNodePrerequisiteNodes = useTypedSelector(
		selectActiveNodePrerequisiteNodes,
	);

	return activeNodePrerequisiteNodes
		.map(activeNodePrerequisiteNode => (
			<PrefillMappingParentListItem
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
