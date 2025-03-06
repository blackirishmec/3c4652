import type { AvantosApiResponse } from '@/interfaces/AvantosInterfaces';
import type { EdgeResource } from '@/interfaces/resources/edgeResources';
import type { FormResource } from '@/interfaces/resources/formResources';
import type { NodeResource } from '@/interfaces/resources/nodeResources';

// *** Can be updated to destructure the transformation result
export type TransformFlowResourceResult = {
	edgeResources: EdgeResource[];
	nodeResources: NodeResource[];
	formResources: FormResource[];
};
export interface TransformFlowResourceProps {
	data: AvantosApiResponse;
}
export function transformFlowResource({
	data,
}: TransformFlowResourceProps): TransformFlowResourceResult {
	return {
		edgeResources: data.edges,
		nodeResources: data.nodes,
		formResources: data.forms,
	};
}
