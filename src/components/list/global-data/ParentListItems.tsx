import { memo } from 'react';

import { selectGlobalData } from '@/redux/features/ui/flow';

import useTypedSelector from '@/hooks/useTypedSelector';

import ParentListItem from '@/components/list/prefill-mapping/ParentListItem';

function ParentListItemsBase() {
	const globalData = useTypedSelector(selectGlobalData);

	return globalData
		.map(globalDataSubset => (
			<ParentListItem
				label={globalDataSubset.key}
				key={globalDataSubset.key}
				globalDataSubset={globalDataSubset}
			/>
		))
		.reverse();
}

const ParentListItems = memo(ParentListItemsBase);

export default ParentListItems;
