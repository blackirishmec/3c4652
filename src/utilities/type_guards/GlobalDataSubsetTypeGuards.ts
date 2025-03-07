import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';

import hasDiscriminant from '@/utilities/type_guards/HasDiscriminantTypeGuards';

export default function isGlobalDataSubset(
	object: unknown,
): object is GlobalDataSubset {
	return hasDiscriminant(object, 'GlobalDataSubset');
}
