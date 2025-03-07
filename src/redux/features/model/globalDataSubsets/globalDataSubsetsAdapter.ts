import { createEntityAdapter } from '@reduxjs/toolkit';

import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

const globalDataSubsetsAdapter = createEntityAdapter<
	GlobalDataSubset,
	GlobalDataSubset['key']
>({
	selectId: globalDataSubset => globalDataSubset.key,
	sortComparer: false,
});

export default globalDataSubsetsAdapter;
