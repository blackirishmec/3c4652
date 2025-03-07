import { memo } from 'react';

import type { GlobalDataSubsetData } from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';

import { Col } from '@/components/layout/FlexComponents';
import ChildrenListItems from '@/components/list/prefill-mapping/ChildrenListItems';

export interface ChildrenListColProps {
	childrenListItemData?: GlobalDataSubsetData[];
	prefilledNode?: Node;
}

function ChildrenListColBase({
	childrenListItemData,
	prefilledNode,
}: ChildrenListColProps) {
	return (
		prefilledNode !== undefined && (
			<Col className="flex-1">
				<ul className="w-full">
					{childrenListItemData !== undefined ? (
						<div>test</div>
					) : (
						<ChildrenListItems prefilledNode={prefilledNode} />
					)}
				</ul>
			</Col>
		)
	);
}

const ChildrenListCol = memo(ChildrenListColBase);

export default ChildrenListCol;
