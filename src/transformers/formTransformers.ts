import type { Form } from '@/interfaces/models/formModels';
import type { FormResource } from '@/interfaces/resources/formResources';

// *** Can be updated to destructure the transformation result
export type TransformProjectResourceResult = {
	form: Form;
};
export function transformFormResource(
	passedFormResource: FormResource,
): TransformProjectResourceResult {
	return { form: passedFormResource };
}

// *** Can be updated to destructure the transformation results
export type TransformProjectResourcesResult = {
	forms: Form[];
};
export function transformFormResources(
	passedFormResources: FormResource[],
): TransformProjectResourcesResult {
	return passedFormResources.reduce<TransformProjectResourcesResult>(
		(acc, resource) => {
			const { form } = transformFormResource(resource);
			return {
				forms: [...acc.forms, form],
			};
		},
		{ forms: [] },
	);
}
