import type { Node } from '@/interfaces/models/nodeModels';

import hasDiscriminant from '@/utilities/type_guards/HasDiscriminantTypeGuards';

export default function isNode(object: unknown): object is Node {
	return hasDiscriminant(object, 'Node');
}
