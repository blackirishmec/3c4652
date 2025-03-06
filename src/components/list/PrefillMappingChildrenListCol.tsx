import { memo } from 'react';

import type {
	AvantosFieldSchemaPropertiesArray,
	AvantosFieldSchemaPropertiesArrayValue,
} from '@/types/AvantosTypes';

import { Col } from '@/components/layout/FlexComponents';
import PrefillMappingChildListItem from '@/components/list/PrefillMappingChildListItem';

export interface PrefillMappingChildrenListColProps {
	nodeFormFieldSchemaPropertiesArray?: AvantosFieldSchemaPropertiesArray;
}

function PrefillMappingChildrenListColBase({
	nodeFormFieldSchemaPropertiesArray,
}: PrefillMappingChildrenListColProps) {
	return (
		<Col className="flex-1">
			<ul className="w-full">
				{nodeFormFieldSchemaPropertiesArray !== undefined &&
					nodeFormFieldSchemaPropertiesArray.map(
						(
							nodeFormFieldSchemaProperty: AvantosFieldSchemaPropertiesArrayValue,
						) => (
							<PrefillMappingChildListItem
								key={nodeFormFieldSchemaProperty.key}
								label={nodeFormFieldSchemaProperty.key}
							/>
						),
					)}
			</ul>
		</Col>
	);
}

const PrefillMappingChildrenListCol = memo(PrefillMappingChildrenListColBase);

export default PrefillMappingChildrenListCol;
