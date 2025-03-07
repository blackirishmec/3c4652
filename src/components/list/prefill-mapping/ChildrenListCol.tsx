import { memo } from 'react';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';

import { Col } from '@/components/layout/FlexComponents';
import GlobalDataChildrenListItems from '@/components/list/global-data/ChildrenListItems';
import PrefillMappingChildrenListItems from '@/components/list/prefill-mapping/ChildrenListItems';

export interface ChildrenListColProps {
	globalDataSubset?: GlobalDataSubset;
	prefilledNode?: Node;
}

function ChildrenListColBase({
	globalDataSubset,
	prefilledNode,
}: ChildrenListColProps) {
	return (
		prefilledNode !== undefined && (
			<Col className="flex-1">
				<ul className="w-full">
					{globalDataSubset !== undefined ? (
						<GlobalDataChildrenListItems
							globalDataSubset={globalDataSubset}
						/>
					) : (
						<PrefillMappingChildrenListItems
							prefilledNode={prefilledNode}
						/>
					)}
				</ul>
			</Col>
		)
	);
}

const ChildrenListCol = memo(ChildrenListColBase);

export default ChildrenListCol;
