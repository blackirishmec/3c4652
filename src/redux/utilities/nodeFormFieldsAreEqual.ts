import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';

const nodeFormFieldMappingsAreEqual = (
	nodeFormFieldA: NodeFormFieldMapping,
	nodeFormFieldB: NodeFormFieldMapping,
): boolean => {
	return (
		nodeFormFieldA.nodeFormFieldSchemaPropertyKey ===
			nodeFormFieldB?.nodeFormFieldSchemaPropertyKey &&
		nodeFormFieldA.nodeId === nodeFormFieldB?.nodeId &&
		nodeFormFieldA.prefillingNodeId === nodeFormFieldB?.prefillingNodeId &&
		nodeFormFieldA.prefillingNodeFormFieldSchemaPropertyKey ===
			nodeFormFieldB?.prefillingNodeFormFieldSchemaPropertyKey
	);
};

export default nodeFormFieldMappingsAreEqual;
