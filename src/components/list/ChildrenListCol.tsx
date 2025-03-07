import { memo } from 'react';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';

import { Col } from '@/components/layout/FlexComponents';
import GlobalDataChildrenListItems from '@/components/list/global-data/ChildrenListItems';
import PrefillMappingChildrenListItems from '@/components/list/prefill-mapping/ChildrenListItems';

export interface ChildrenListColProps {
	globalDataSubset?: GlobalDataSubset;
	prefillingNode?: Node;
}

function ChildrenListColBase({
	globalDataSubset,
	prefillingNode,
}: ChildrenListColProps) {
	return (
		<Col className="flex-1">
			<ul className="w-full">
				{globalDataSubset !== undefined ? (
					<GlobalDataChildrenListItems
						globalDataSubset={globalDataSubset}
					/>
				) : (
					prefillingNode !== undefined && (
						<PrefillMappingChildrenListItems
							prefillingNode={prefillingNode}
						/>
					)
				)}
			</ul>
		</Col>
	);
}

const ChildrenListCol = memo(ChildrenListColBase);

export default ChildrenListCol;
