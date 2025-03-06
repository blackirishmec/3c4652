import type { NodeFormField } from '@/interfaces/AvantosInterfaces';

const nodeFormFieldsAreEqual = (
	nodeFormFieldA: NodeFormField,
	nodeFormFieldB: NodeFormField,
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

export default nodeFormFieldsAreEqual;
