import { memo } from 'react';

import { selectAllGlobalDataSubsets } from '@/redux/features/model/globalDataSubsets/selectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import ParentListItem from '@/components/list/ParentListItem';

function ParentListItemsBase() {
	const globalData = useTypedSelector(selectAllGlobalDataSubsets);

	return globalData
		.map(globalDataSubset => (
			<ParentListItem
				key={globalDataSubset.id}
				globalDataSubset={globalDataSubset}
			/>
		))
		.reverse();
}

const ParentListItems = memo(ParentListItemsBase);

export default ParentListItems;
