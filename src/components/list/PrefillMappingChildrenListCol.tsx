import { memo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';
import type {
	FormFieldSchemaPropertiesArray,
	FormFieldSchemaPropertiesArrayValue,
} from '@/types/AvantosTypes';

import { Col } from '@/components/layout/FlexComponents';
import PrefillMappingChildListItem from '@/components/list/PrefillMappingChildListItem';

export interface PrefillMappingChildrenListColProps {
	parentNode?: Node;
	nodeFormFieldSchemaPropertiesArray?: FormFieldSchemaPropertiesArray;
}

function PrefillMappingChildrenListColBase({
	nodeFormFieldSchemaPropertiesArray,
	parentNode,
}: PrefillMappingChildrenListColProps) {
	return (
		<Col className="flex-1">
			<ul className="w-full">
				{nodeFormFieldSchemaPropertiesArray !== undefined &&
					nodeFormFieldSchemaPropertiesArray.map(
						(
							nodeFormFieldSchemaProperty: FormFieldSchemaPropertiesArrayValue,
						) => (
							<PrefillMappingChildListItem
								key={nodeFormFieldSchemaProperty.key}
								nodeFormFieldSchemaProperty={
									nodeFormFieldSchemaProperty
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
