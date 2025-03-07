import { memo } from 'react';

import { selectGlobalData } from '@/redux/features/ui/flow';

import useTypedSelector from '@/hooks/useTypedSelector';

import PrefillMappingParentListItem from '@/components/list/PrefillMappingParentListItem';

function GlobalDataParentListItemsBase() {
	const globalData = useTypedSelector(selectGlobalData);

	return globalData
		.map(globalDataSubset => (
			<PrefillMappingParentListItem
				label={globalDataSubset.key}
				key={globalDataSubset.key}
				childrenListItemData={globalDataSubset.subsetData}
			/>
		))
		.reverse();
}

const GlobalDataParentListItems = memo(GlobalDataParentListItemsBase);

export default GlobalDataParentListItems;
