import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiDatabase, PiXCircleFill } from 'react-icons/pi';

import type { RowProps } from '../../layout/FlexComponents';
import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { Node } from '@/interfaces/models/nodeModels';
import type { RootState } from '@/redux/store';
import type { FormFieldSchemaPropertiesArrayValue } from '@/types/AvantosTypes';
import type { MouseEvent } from 'react';

import { selectGlobalDataSubsetById } from '@/redux/features/model/globalDataSubsets/selectors';
import { selectNodeById } from '@/redux/features/model/nodes';
import {
	removeNodeFormFieldMapping,
	setActiveNodeFormFieldPropertyKey,
} from '@/redux/features/ui/flow';
import { createSelectSavedNodeFormFieldMappingForActiveNodeByPropertyKey } from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import { selectPrefillingEnabledByActiveNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from '../../layout/FlexComponents';

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
	className?: RowProps['className'];
}

function FormFieldRowBase({ property, className }: FormFieldRowProps) {
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

	const prefillingNode: Node = useTypedSelector((state: RootState) => {
		return selectNodeById(
			state,
			savedNodeFormFieldMappingForActiveNodeByPropertyKey?.prefillingParentIdentifier ??
				'',
		);
	});
	const prefillingGlobalDataSubset: GlobalDataSubset = useTypedSelector(
		(state: RootState) =>
			selectGlobalDataSubsetById(
				state,
				savedNodeFormFieldMappingForActiveNodeByPropertyKey?.prefillingParentIdentifier ??
					'',
			),
	);
	const prefillingParentModel =
		savedNodeFormFieldMappingForActiveNodeByPropertyKey?.prefillingModelType ===
		'Node'
			? prefillingNode
			: prefillingGlobalDataSubset;

	const prefillingEnabledByActiveNode = useTypedSelector(
		selectPrefillingEnabledByActiveNode,
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

	const rowLabel = useMemo(() => {
		const prefillingParentModelName =
			prefillingParentModel?.discriminant === 'Node'
				? prefillingParentModel.data.name
				: (prefillingParentModel?.id ?? '');

		return `${property.key}${
			prefillingParentModel !== undefined &&
			savedNodeFormFieldMappingForActiveNodeByPropertyKey !== undefined
				? `: ${prefillingParentModelName}.${savedNodeFormFieldMappingForActiveNodeByPropertyKey.prefillingChildIdentifier}`
				: ''
		}`;
	}, [
		prefillingParentModel,
		property.key,
		savedNodeFormFieldMappingForActiveNodeByPropertyKey,
	]);

	return (
		<Row
			className={clsx(
				classes.containerRow,
				prefilled && classes.prefilledContainerRow,
				className,
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
					<PiXCircleFill
						className={clsx(
							'text-gray-400 hover:text-gray-500 hover:bg-red-300 rounded-full',
							!prefillingEnabledByActiveNode &&
								'pointer-events-none',
						)}
						size={24}
					/>
				</Col>
			)}
		</Row>
	);
}

const FormFieldRow = memo(FormFieldRowBase);

export default FormFieldRow;
