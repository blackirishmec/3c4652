import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';
import { PiTable } from 'react-icons/pi';

import type { AvantosNode } from './types';
import type { NodeProps } from '@xyflow/react';

import { Col, Row } from '../components/layout/FlexComponents';

const classes = {
	rowContainer: `
		p-2.5
		border 
		rounded-xl
		w-[200px]
		text-center
		border-[1px]
		border-[#ddd]
	`,
	rowSelected: `
		border-blue-500
	`,
} as const;

export function FormNode({ data, selected, dragging }: NodeProps<AvantosNode>) {
	return (
		<Row
			className={clsx(
				classes.rowContainer,
				selected === true && classes.rowSelected,
				dragging ? 'bg-[#fafafa]' : 'bg-[#fff]',
			)}
		>
			<Handle
				type="target"
				position={Position.Left}
				style={{
					height: 10,
					width: 10,
					background: 'white',
					borderWidth: 2.5,
					borderColor: '#818186',
					borderStyle: 'solid',
				}}
			/>
			<Col className="bg-blue-400 w-12 rounded-lg">
				<Row
					className="flex-1 h-full aspect-square"
					childrenVerticalPosition="center"
					childrenHorizontalPosition="center"
				>
					<PiTable color="white" className="text-2xl" />
				</Row>
				{/* <Row
					className="bg-blue-500 flex-1"
					childrenVerticalPosition="center"
				>
					<PiTable color="white" className="text-xl" />
				</Row> */}
			</Col>
			<Col className="pl-2.5">
				<Row className="text-gray-500 text-sm">Form</Row>
				<Row className="font-semibold">{data.name}</Row>
			</Col>
			<Handle
				type="source"
				position={Position.Right}
				style={{ background: '#555' }}
			/>
		</Row>
	);
}

export default FormNode;
