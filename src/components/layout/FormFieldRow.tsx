import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiDatabase, PiXCircleFill } from 'react-icons/pi';

import type { RootState } from '@/redux/store';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { MouseEvent } from 'react';

import { selectNodeById } from '@/redux/features/model/nodes';
import {
	removeNodeFormFieldMapping,
	setActiveNodeFormFieldPropertyKey,
} from '@/redux/features/ui/flow';
import { createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from './FlexComponents';

const classes = {
	containerRow: `
		rounded-sm 
		py-1 
		px-2 
		bg-gray-100 
		border
		border-dashed
		border-gray-300
		hover:bg-blue-50
		hover:border-blue-500
		cursor-pointer
	`,
	prefilledContainerRow: `
		rounded-full!
		border-solid!
		border-gray-100!
		hover:border-gray-100!
		hover:bg-gray-100!
	`,
	label: `
		flex-1 
		pl-2
		text-gray-400
	`,
	prefilledLabel: `
		text-black!
	`,
} as const;

export interface FormFieldRowProps {
	property: FormFieldSchemaPropertiesArrayValue;
}

function FormFieldRowBase({ property }: FormFieldRowProps) {
	const dispatch = useAppDispatch();

	const selectSavedNodeFormFieldMappingForActiveNodeByPropertyKey = useMemo(
		() =>
			createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey(
				property.key,
			),
		[property.key],
	);
	const savedNodeFormFieldMappingForActiveNodeByPropertyKey =
		useTypedSelector(
			selectSavedNodeFormFieldMappingForActiveNodeByPropertyKey,
		);

	const prefillingNode = useTypedSelector((state: RootState) =>
		selectNodeById(
			state,
			savedNodeFormFieldMappingForActiveNodeByPropertyKey?.prefillingNodeId ??
				'',
		),
	);

	const handleRowOnClick = useCallback(() => {
		dispatch(setActiveNodeFormFieldPropertyKey(property.key));
	}, [dispatch, property.key]);

	const handleRemoveMappingOnClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			if (
				savedNodeFormFieldMappingForActiveNodeByPropertyKey ===
				undefined
			) {
				return;
			}

			dispatch(
				removeNodeFormFieldMapping(
					savedNodeFormFieldMappingForActiveNodeByPropertyKey,
				),
			);

			e.stopPropagation();
		},
		[dispatch, savedNodeFormFieldMappingForActiveNodeByPropertyKey],
	);

	const prefilled = useMemo(
		() => savedNodeFormFieldMappingForActiveNodeByPropertyKey !== undefined,
		[savedNodeFormFieldMappingForActiveNodeByPropertyKey],
	);

	const rowLabel = useMemo(
		() =>
			`${property.key}${
				prefillingNode !== undefined &&
				savedNodeFormFieldMappingForActiveNodeByPropertyKey !==
					undefined
					? `: ${prefillingNode.data.name}.${savedNodeFormFieldMappingForActiveNodeByPropertyKey.prefillingNodeFormFieldSchemaPropertyKey}`
					: ''
			}`,
		[
			prefillingNode,
			property.key,
			savedNodeFormFieldMappingForActiveNodeByPropertyKey,
		],
	);

	return (
		<Row
			className={clsx(
				classes.containerRow,
				prefilled && classes.prefilledContainerRow,
			)}
			onClick={handleRowOnClick}
		>
			{!prefilled && (
				<Col childrenVerticalPosition="center">
					<PiDatabase className="text-xl" />
				</Col>
			)}
			<Col
				className={clsx(
					classes.label,
					prefilled && classes.prefilledLabel,
				)}
			>
				{rowLabel}
			</Col>
			{prefilled && (
				<Col
					onClick={handleRemoveMappingOnClick}
					childrenVerticalPosition="center"
				>
					<PiXCircleFill color="gray" />
				</Col>
			)}
		</Row>
	);
}

const FormFieldRow = memo(FormFieldRowBase);

export default FormFieldRow;
