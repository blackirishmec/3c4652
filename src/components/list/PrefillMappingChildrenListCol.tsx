import { memo, useMemo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';

import { createSelectFormFieldSchemaPropertiesArrayByNode } from '@/redux/selectors/relationships/formRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import { Col } from '@/components/layout/FlexComponents';
import PrefillMappingChildListItem from '@/components/list/PrefillMappingChildListItem';

export interface PrefillMappingChildrenListColProps {
	parentNode?: Node;
}

function PrefillMappingChildrenListColBase({
	parentNode,
}: PrefillMappingChildrenListColProps) {
	const selectFormFieldSchemaPropertiesArrayByNode = useMemo(
		() =>
			createSelectFormFieldSchemaPropertiesArrayByNode(
				parentNode ? parentNode.id : '',
			),
		[parentNode],
	);
	const formFieldSchemaPropertiesArrayByNode = useTypedSelector(
		selectFormFieldSchemaPropertiesArrayByNode,
	);

	return (
		<Col className="flex-1">
			<ul className="w-full">
				{formFieldSchemaPropertiesArrayByNode !== undefined &&
					formFieldSchemaPropertiesArrayByNode.map(
						(
							formFieldSchemaPropertiesArrayValue: FormFieldSchemaPropertiesArrayValue,
						) => (
							<PrefillMappingChildListItem
								key={formFieldSchemaPropertiesArrayValue.key}
								formFieldSchemaPropertiesArrayValue={
									formFieldSchemaPropertiesArrayValue
								}
								parentNode={parentNode}
							/>
						),
					)}
			</ul>
		</Col>
	);
}

const PrefillMappingChildrenListCol = memo(PrefillMappingChildrenListColBase);

export default PrefillMappingChildrenListCol;
