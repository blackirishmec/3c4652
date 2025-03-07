import { memo, useMemo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { createSelectFormFieldSchemaPropertiesArrayByNode } from '@/redux/selectors/relationships/formRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import { Col } from '@/components/layout/FlexComponents';
import PrefillMappingChildListItem from '@/components/list/PrefillMappingChildListItem';

export interface PrefillMappingChildrenListColProps {
	prerequisiteNode?: Node;
	searchTerm?: string;
}

function PrefillMappingChildrenListColBase({
	prerequisiteNode,
	searchTerm,
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
								if (searchTerm === undefined) return true;

								return formFieldSchemaPropertiesArrayValueByPrerequisiteNode.key.includes(
									searchTerm,
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
									formFieldSchemaPropertiesArrayValueByPrerequisiteNode={
										formFieldSchemaPropertiesArrayValueByPrerequisiteNode
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
