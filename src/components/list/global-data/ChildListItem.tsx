import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiXCircleFill } from 'react-icons/pi';

import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';
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

export interface ChildListItemProps {
	globalDataSubsetKey: GlobalDataSubset['id'];
	globalDataSubsetDataKey: GlobalDataSubsetData['id'];
}

function ChildListItemBase({
	globalDataSubsetKey,
	globalDataSubsetDataKey,
}: ChildListItemProps) {
	const dispatch = useAppDispatch();

	const label = useMemo(
		() => globalDataSubsetDataKey,
		[globalDataSubsetDataKey],
	);

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

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				activePrefillingChildModelIdentifier !== globalDataSubsetDataKey
			) {
				dispatch(
					setActivePrefillingParent({
						identifier: globalDataSubsetKey,
						prefillingModelType: 'GlobalDataSubset',
					}),
				);

				dispatch(
					setActivePrefillingChildIdentifier(globalDataSubsetDataKey),
				);
			}

			_e.stopPropagation();
		},
		[
			activePrefillingChildModelIdentifier,
			dispatch,
			globalDataSubsetDataKey,
			globalDataSubsetKey,
		],
	);

	const listItemHasActiveMapping = useMemo(
		() =>
			activePrefillingParentModelByActiveNode?.id ===
				globalDataSubsetKey &&
			activePrefillingChildModelIdentifier === globalDataSubsetDataKey,
		[
			activePrefillingParentModelByActiveNode?.id,
			activePrefillingChildModelIdentifier,
			globalDataSubsetKey,
			globalDataSubsetDataKey,
		],
	);

	const listItemHasSavedMapping = useMemo(
		() =>
			savedPrefillingModelByActiveNodeAndActivePrefillingParentModelIdentifier?.id ===
				globalDataSubsetKey &&
			savedPrefillingChildIdentifierByActiveNodeAndActivePrefillingParentModelIdentifier ===
				globalDataSubsetDataKey,
		[
			globalDataSubsetKey,
			globalDataSubsetDataKey,
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
			activePrefillingChildModelIdentifier,
			listItemHasActiveMapping,
			listItemHasSavedMapping,
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

const ChildListItem = memo(ChildListItemBase);

export default ChildListItem;
