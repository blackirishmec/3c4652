import { memo } from 'react';

import type { Node } from '@/interfaces/models/nodeModels';
import type {
	AvantosFieldSchemaPropertiesArray,
	AvantosFieldSchemaPropertiesArrayValue,
} from '@/types/AvantosTypes';

import { Col } from '@/components/layout/FlexComponents';
import PrefillMappingChildListItem from '@/components/list/PrefillMappingChildListItem';

export interface PrefillMappingChildrenListColProps {
	parentNode?: Node;
	nodeFormFieldSchemaPropertiesArray?: AvantosFieldSchemaPropertiesArray;
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
							nodeFormFieldSchemaProperty: AvantosFieldSchemaPropertiesArrayValue,
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
