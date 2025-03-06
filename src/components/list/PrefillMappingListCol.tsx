import { memo, useState } from 'react';

import InputRow from '@/components/form/input/InputRow';
import { Col, Row } from '@/components/layout/FlexComponents';

export interface PrefillMappingListColProps {}

function PrefillMappingListColBase({}: PrefillMappingListColProps) {
	const [searchTerm, setSearchTerm] = useState<string>('');

	return (
		<Col className="flex-1 w-50 border-r border-gray-300 pt-4 px-4 bg-[#F6F6F6]">
			<Row>Available data</Row>
			<Row>
				<InputRow />
			</Row>
			<Row>List</Row>
		</Col>
	);
}

const PrefillMappingListCol = memo(PrefillMappingListColBase);

export default PrefillMappingListCol;
