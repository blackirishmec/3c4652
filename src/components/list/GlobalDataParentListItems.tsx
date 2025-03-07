import { memo } from 'react';

import { selectGlobalData } from '@/redux/features/ui/flow';

import useTypedSelector from '@/hooks/useTypedSelector';

import ParentListItem from '@/components/list/prefill-mapping/ParentListItem';

function GlobalDataParentListItemsBase() {
	const globalData = useTypedSelector(selectGlobalData);

	return globalData
		.map(globalDataSubset => (
			<ParentListItem
				label={globalDataSubset.key}
				key={globalDataSubset.key}
				childrenListItemData={globalDataSubset.subsetData}
			/>
		))
		.reverse();
}

const GlobalDataParentListItems = memo(GlobalDataParentListItemsBase);

export default GlobalDataParentListItems;
