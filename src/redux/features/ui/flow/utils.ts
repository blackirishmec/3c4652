import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';

export const nodeFormFieldMappingsAreEqual = (
	nodeFormFieldA: NodeFormFieldMapping,
	nodeFormFieldB: NodeFormFieldMapping,
): boolean => {
	return (
		nodeFormFieldA.nodeId === nodeFormFieldB?.nodeId &&
		nodeFormFieldA.nodeFormFieldSchemaPropertyKey ===
			nodeFormFieldB?.nodeFormFieldSchemaPropertyKey &&
		nodeFormFieldA.prefillingNodeId === nodeFormFieldB?.prefillingNodeId &&
		nodeFormFieldA.prefillingNodeFormFieldSchemaPropertyKey ===
			nodeFormFieldB?.prefillingNodeFormFieldSchemaPropertyKey
	);
};

export const nodeFormFieldMappingIsUpdate = (
	nodeFormFieldA: NodeFormFieldMapping,
	nodeFormFieldB: NodeFormFieldMapping,
): boolean => {
	return (
		nodeFormFieldA.nodeId === nodeFormFieldB?.nodeId &&
		nodeFormFieldA.nodeFormFieldSchemaPropertyKey ===
			nodeFormFieldB?.nodeFormFieldSchemaPropertyKey
	);
};
