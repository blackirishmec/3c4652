import { memo, useCallback, useEffect } from 'react';

import type { ChangeEvent } from 'react';

import {
	resetAvailableDataSearchTerm,
	setAvailableDataSearchTerm,
} from '@/redux/features/ui/flow';

import useAppDispatch from '@/hooks/useAppDispatch';

import InputRow from '@/components/form/input/InputRow';
import { Col, Row } from '@/components/layout/FlexComponents';
import GlobalDataParentListItems from '@/components/list/global-data/ParentListItems';
import PrefillMappingParentListItems from '@/components/list/prefill-mapping/ParentListItems';

function ParentListColBase() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(resetAvailableDataSearchTerm());
	}, [dispatch]);

	const handleInputRowOnChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) =>
			dispatch(setAvailableDataSearchTerm(e.target.value)),
		[dispatch],
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
					<GlobalDataParentListItems />
					<PrefillMappingParentListItems />
				</ul>
			</Row>
		</Col>
	);
}

const ParentListCol = memo(ParentListColBase);

export default ParentListCol;
