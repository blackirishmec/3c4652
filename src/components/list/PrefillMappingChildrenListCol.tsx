import { memo, useMemo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { selectAvailableDataSearchTerm } from '@/redux/features/ui/flow';
import { createSelectFormFieldSchemaPropertiesArrayByNode } from '@/redux/selectors/relationships/formRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import { Col } from '@/components/layout/FlexComponents';
import PrefillMappingChildListItem from '@/components/list/PrefillMappingChildListItem';

export interface PrefillMappingChildrenListColProps {
	prerequisiteNode?: Node;
}

function PrefillMappingChildrenListColBase({
	prerequisiteNode,
}: PrefillMappingChildrenListColProps) {
	const selectFormFieldSchemaPropertiesArrayByPrerequisiteNode = useMemo(
		() =>
			createSelectFormFieldSchemaPropertiesArrayByNode(
				prerequisiteNode ? prerequisiteNode.id : '',
			),
		[prerequisiteNode],
	);
	const formFieldSchemaPropertiesArrayByPrerequisiteNode = useTypedSelector(
		selectFormFieldSchemaPropertiesArrayByPrerequisiteNode,
	);

	const availableDataSearchTerm = useTypedSelector(
		selectAvailableDataSearchTerm,
	);

	return (
		<Col className="flex-1">
			<ul className="w-full">
				{formFieldSchemaPropertiesArrayByPrerequisiteNode !==
					undefined &&
					formFieldSchemaPropertiesArrayByPrerequisiteNode
						.filter(
							(
								formFieldSchemaPropertiesArrayValueByPrerequisiteNode: FormFieldSchemaPropertiesArrayValue,
							) => {
								if (availableDataSearchTerm === undefined)
									return true;

								return formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key.includes(
									availableDataSearchTerm,
								);
							},
						)
						.map(
							(
								formFieldSchemaPropertiesArrayValueByPrerequisiteNode: FormFieldSchemaPropertiesArrayValue,
							) => (
								<PrefillMappingChildListItem
									key={
										formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
									}
									prefillingNodeFormFieldSchemaPropertyKey={
										formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key
									}
									prerequisiteNode={prerequisiteNode}
								/>
							),
						)}
			</ul>
		</Col>
	);
}

const PrefillMappingChildrenListCol = memo(PrefillMappingChildrenListColBase);

export default PrefillMappingChildrenListCol;
