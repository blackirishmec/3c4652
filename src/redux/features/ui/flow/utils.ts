import type { NodeFormFieldMapping } from '@/interfaces/AvantosInterfaces';

export const nodeFormFieldMappingsAreEqual = (
	nodeFormFieldA: NodeFormFieldMapping,
	nodeFormFieldB: NodeFormFieldMapping,
): boolean => {
	return (
		nodeFormFieldA.nodeId === nodeFormFieldB?.nodeId &&
		nodeFormFieldA.nodeFormFieldSchemaPropertyKey ===
			nodeFormFieldB?.nodeFormFieldSchemaPropertyKey &&
		nodeFormFieldA.prefillingParentIdentifier ===
			nodeFormFieldB?.prefillingParentIdentifier &&
		nodeFormFieldA.prefillingChildIdentifier ===
			nodeFormFieldB?.prefillingChildIdentifier &&
		nodeFormFieldA.prefillingModelType ===
			nodeFormFieldB?.prefillingModelType
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
