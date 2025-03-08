import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiXCircleFill } from 'react-icons/pi';

import type { PrefillingModelType } from '@/redux/features/ui/flow';
import type { MouseEvent } from 'react';

import {
	removeNodeFormFieldMapping,
	selectActivePrefillingChildIdentifier,
	setActivePrefillingChildIdentifier,
	setActivePrefillingParent,
} from '@/redux/features/ui/flow';
import {
	selectActivePrefillingParentModelByActiveNode,
	selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
	selectSavedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier,
	selectSavedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier,
} from '@/redux/selectors/relationships/nodeFormFieldRelationshipSelectors';
import { selectPrefillingEnabledByActiveNode } from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useAppDispatch from '@/hooks/useAppDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';

import { Col, Row } from '@/components/layout/FlexComponents';

import classes from '@/styles/childListItemClasses';

export interface SharedChildListItemProps {
	parentIdentifier: string;
	childIdentifier: string;
	label: string;
	parentModelType: PrefillingModelType;
}

function SharedChildListItemBase({
	parentIdentifier,
	childIdentifier,
	label,
	parentModelType,
}: SharedChildListItemProps) {
	const dispatch = useAppDispatch();

	const activePrefillingParentModelByActiveNode = useTypedSelector(
		selectActivePrefillingParentModelByActiveNode,
	);

	const activePrefillingChildModelIdentifier = useTypedSelector(
		selectActivePrefillingChildIdentifier,
	);

	const savedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier =
		useTypedSelector(
			selectSavedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier,
		);

	const savedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier =
		useTypedSelector(
			selectSavedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier,
		);

	const savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey =
		useTypedSelector(
			selectSavedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
		);

	const prefillingEnabledByActiveNode = useTypedSelector(
		selectPrefillingEnabledByActiveNode,
	);

	/**
	 * Click handlers
	 */
	const handleLIOnClick = useCallback(
		(e: MouseEvent<HTMLLIElement>) => {
			if (activePrefillingChildModelIdentifier !== childIdentifier) {
				dispatch(
					setActivePrefillingParent({
						identifier: parentIdentifier,
						prefillingModelType: parentModelType,
					}),
				);

				dispatch(setActivePrefillingChildIdentifier(childIdentifier));
			}
			e.stopPropagation();
		},
		[
			activePrefillingChildModelIdentifier,
			childIdentifier,
			parentIdentifier,
			parentModelType,
			dispatch,
		],
	);

	const handleRemoveMappingOnClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			if (
				savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey ===
				undefined
			) {
				return;
			}

			dispatch(
				removeNodeFormFieldMapping(
					savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey,
				),
			);

			e.stopPropagation();
		},
		[dispatch, savedNodeFormFieldMappingByActiveNodeAndActivePropertyKey],
	);

	const listItemHasActiveMapping = useMemo(
		() =>
			activePrefillingParentModelByActiveNode?.id === parentIdentifier &&
			activePrefillingChildModelIdentifier === childIdentifier,
		[
			activePrefillingParentModelByActiveNode?.id,
			activePrefillingChildModelIdentifier,
			parentIdentifier,
			childIdentifier,
		],
	);

	const listItemHasSavedMapping = useMemo(
		() =>
			savedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier?.id ===
				parentIdentifier &&
			savedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier ===
				childIdentifier,
		[
			parentIdentifier,
			childIdentifier,
			savedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier,
			savedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier,
		],
	);

	const listItemHasUpdatedSavedMapping = useMemo(
		() =>
			listItemHasSavedMapping &&
			activePrefillingChildModelIdentifier !== undefined &&
			!listItemHasActiveMapping,
		[
			listItemHasSavedMapping,
			activePrefillingChildModelIdentifier,
			listItemHasActiveMapping,
		],
	);

	const listItemHasActiveOrSavedMapping = useMemo(
		() => listItemHasSavedMapping || listItemHasActiveMapping,
		[listItemHasActiveMapping, listItemHasSavedMapping],
	);

	const listItemHasActiveAndSavedMapping = useMemo(
		() => listItemHasSavedMapping && listItemHasActiveMapping,
		[listItemHasActiveMapping, listItemHasSavedMapping],
	);

	return (
		<li
			onClick={handleLIOnClick}
			className={clsx(
				classes.childRow,
				listItemHasActiveOrSavedMapping &&
					classes.hasActiveOrSavedMapping,
				listItemHasUpdatedSavedMapping && classes.savedButUpdated,
			)}
		>
			<Row className="flex-1">
				<Col className="flex-1">{label}</Col>
				{((listItemHasSavedMapping &&
					activePrefillingChildModelIdentifier === undefined) ||
					listItemHasActiveAndSavedMapping) && (
					<Col
						className="pr-1"
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
		</li>
	);
}

const SharedChildListItem = memo(SharedChildListItemBase);

export default SharedChildListItem;
