import { memo, useMemo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectAvailableDataSearchTerm } from '@/redux/features/ui/flow';
import { createSelectFormFieldSchemaPropertiesArrayByNode } from '@/redux/selectors/relationships/formRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import ChildListItem from '@/components/list/prefill-mapping/ChildListItem';

export interface ChildrenListItemsProps {
	prefillingNode: Node;
}

function ChildrenListItemsBase({ prefillingNode }: ChildrenListItemsProps) {
	const selectFormFieldSchemaPropertiesArrayByPrefillingNode = useMemo(
		() =>
			createSelectFormFieldSchemaPropertiesArrayByNode(prefillingNode.id),
		[prefillingNode],
	);
	const formFieldSchemaPropertiesArrayByPrefillingNode = useTypedSelector(
		selectFormFieldSchemaPropertiesArrayByPrefillingNode,
	);

	const availableDataSearchTerm = useTypedSelector(
		selectAvailableDataSearchTerm,
	);

	return (
		formFieldSchemaPropertiesArrayByPrefillingNode !== undefined &&
		prefillingNode !== undefined &&
		formFieldSchemaPropertiesArrayByPrefillingNode
			.filter(
				(
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode: FormFieldSchemaPropertiesArrayValue,
				) => {
					if (availableDataSearchTerm === undefined) return true;

					return formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key.includes(
						availableDataSearchTerm,
					);
				},
			)
			.map(
				(
					formFieldSchemaPropertiesArrayValueByPrerequisiteNode: FormFieldSchemaPropertiesArrayValue,
				) => (
					<ChildListItem
						key={
							formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
						}
						prefillingNodeFormFieldSchemaPropertyKey={
							formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
						}
						prefillingNode={prefillingNode}
					/>
				),
			)
	);
}

const ChildrenListItems = memo(ChildrenListItemsBase);

export default ChildrenListItems;
