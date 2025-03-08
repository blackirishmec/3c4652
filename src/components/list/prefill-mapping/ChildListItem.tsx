import { memo, useMemo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';

import SharedChildListItem from '@/components/list/SharedChildListItem';

export interface ChildListItemNodeProps {
	prefillingNodeFormFieldSchemaPropertyKey: string;
	prefillingNode: Node;
}

function ChildListItemNode({
	prefillingNodeFormFieldSchemaPropertyKey,
	prefillingNode,
}: ChildListItemNodeProps) {
	const label = useMemo(
		() => prefillingNodeFormFieldSchemaPropertyKey,
		[prefillingNodeFormFieldSchemaPropertyKey],
	);

	return (
		<SharedChildListItem
			label={label}
			parentIdentifier={prefillingNode.id}
			childIdentifier={prefillingNodeFormFieldSchemaPropertyKey}
			parentModelType="Node"
		/>
	);
}

export default memo(ChildListItemNode);
