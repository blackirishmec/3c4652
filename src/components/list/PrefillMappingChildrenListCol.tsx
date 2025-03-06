import { memo } from 'react';

import type {
	AvantosFieldSchemaPropertiesArray,
	AvantosFieldSchemaPropertiesArrayValue,
} from '@/types/AvantosTypes';

import { Col } from '@/components/layout/FlexComponents';

export interface PrefillMappingChildrenListColProps {
	nodeFormFieldSchemaPropertiesArray?: AvantosFieldSchemaPropertiesArray;
}

function PrefillMappingChildrenListColBase({
	nodeFormFieldSchemaPropertiesArray,
}: PrefillMappingChildrenListColProps) {
	return (
		<Col className="flex-1 pl-10">
			<ul className="w-full">
				{nodeFormFieldSchemaPropertiesArray !== undefined &&
					nodeFormFieldSchemaPropertiesArray.map(
						(
							nodeFormFieldSchemaProperty: AvantosFieldSchemaPropertiesArrayValue,
						) => (
							<li key={nodeFormFieldSchemaProperty.key}>
								{nodeFormFieldSchemaProperty.key}
							</li>
						),
					)}
			</ul>
		</Col>
	);
}

const PrefillMappingChildrenListCol = memo(PrefillMappingChildrenListColBase);

export default PrefillMappingChildrenListCol;
