import { createEntityAdapter } from '@reduxjs/toolkit';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

const globalDataSubsetsAdapter = createEntityAdapter<
	GlobalDataSubset,
	GlobalDataSubset['id']
>({
	selectId: globalDataSubset => globalDataSubset.id,
	sortComparer: false,
});

export default globalDataSubsetsAdapter;
