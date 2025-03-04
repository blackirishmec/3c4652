import { Handle, Position } from '@xyflow/react';

import type { AvantosNode } from './types';
import type { NodeProps } from '@xyflow/react';

export function FormNode({ data, selected, dragging }: NodeProps<AvantosNode>) {
	return (
		<div
			style={{
				padding: '10px',
				border: selected === true ? '2px solid blue' : '1px solid #ddd',
				backgroundColor: dragging ? '#fafafa' : '#fff',
				borderRadius: '5px',
				width: '150px',
				textAlign: 'center',
			}}
		>
			<div>{data.name}</div>
			{/* A handle for incoming connections */}
			<Handle
				type="target"
				position={Position.Left}
				style={{
					height: 2,
					width: 2,
					background: 'white',
					borderWidth: 2,
					borderColor: '#818186',
					borderStyle: 'solid',
				}}
			/>
			{/* A handle for outgoing connections */}
			<Handle
				type="source"
				position={Position.Right}
				style={{ background: '#555' }}
			/>
		</div>
	);
}

export default FormNode;
