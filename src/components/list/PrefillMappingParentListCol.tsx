import { memo, useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';

import { selectActiveNodePrerequisiteNodes } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import InputRow from '@/components/form/input/InputRow';
import { Col, Row } from '@/components/layout/FlexComponents';
import PrefillMappingParentListItem from '@/components/list/PrefillMappingParentListItem';

// export interface PrefillMappingParentListColProps {}

function PrefillMappingParentListColBase() {
	// {}: PrefillMappingParentListColProps
	const [searchTerm, setSearchTerm] = useState<string>('');

	const activeNodePrerequisiteNodes = useTypedSelector(
		selectActiveNodePrerequisiteNodes,
	);

	const handleInputRowOnChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
		[],
	);

	return (
		<Col className="flex-1 h-full overflow-hidden w-50 border-r border-gray-300 pt-4 px-4 bg-[#F6F6F6]">
			<Row>Available data</Row>
			<Row className="pt-2">
				<InputRow
					placeholder="Search"
					onChange={handleInputRowOnChange}
				/>
			</Row>
			<Row className="pt-1 overflow-y-auto">
				<ul className="w-full">
					<PrefillMappingParentListItem label="Action Properties" />
					<PrefillMappingParentListItem label="Client Organization Properties" />
					{activeNodePrerequisiteNodes
						.map(activeNodePrerequisiteNode => (
							<PrefillMappingParentListItem
								prerequisiteNode={activeNodePrerequisiteNode}
								key={activeNodePrerequisiteNode.id}
								searchTerm={searchTerm}
							/>
						))
						.reverse()}
				</ul>
			</Row>
		</Col>
	);
}

const PrefillMappingParentListCol = memo(PrefillMappingParentListColBase);

export default PrefillMappingParentListCol;
