import { memo, useMemo } from 'react';

import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';

import SharedChildListItem from '@/components/list/SharedChildListItem';

export interface ChildListItemGlobalDataProps {
	globalDataSubsetKey: GlobalDataSubset['id'];
	globalDataSubsetDataKey: GlobalDataSubsetData['id'];
}

function ChildListItemGlobalData({
	globalDataSubsetKey,
	globalDataSubsetDataKey,
}: ChildListItemGlobalDataProps) {
	const label = useMemo(
		() => globalDataSubsetDataKey,
		[globalDataSubsetDataKey],
	);

	return (
		<SharedChildListItem
			label={label}
			parentIdentifier={globalDataSubsetKey}
			childIdentifier={globalDataSubsetDataKey}
			parentModelType="GlobalDataSubset"
		/>
	);
}

export default memo(ChildListItemGlobalData);
