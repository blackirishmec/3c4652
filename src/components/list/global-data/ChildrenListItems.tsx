import { memo } from 'react';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

import { selectAvailableDataSearchTerm } from '@/redux/features/ui/flow';

import useTypedSelector from '@/hooks/useTypedSelector';

import ChildListItem from '@/components/list/global-data/ChildListItem';

export interface ChildrenListItemsProps {
	globalDataSubset: GlobalDataSubset;
}

function ChildrenListItemsBase({ globalDataSubset }: ChildrenListItemsProps) {
	const availableDataSearchTerm = useTypedSelector(
		selectAvailableDataSearchTerm,
	);

	return globalDataSubset.subsetData
		.filter(globalDataSubsetData => {
			if (availableDataSearchTerm === undefined) return true;

			return globalDataSubsetData.id.includes(availableDataSearchTerm);
		})
		.map(globalDataSubsetData => (
			<ChildListItem
				key={globalDataSubsetData.id}
				globalDataSubsetKey={globalDataSubset.id}
				globalDataSubsetDataKey={globalDataSubsetData.id}
			/>
		));
}

const ChildrenListItems = memo(ChildrenListItemsBase);

export default ChildrenListItems;
