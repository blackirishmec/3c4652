import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import type {
	GlobalDataSubset,
	GlobalDataSubsetData,
} from '@/interfaces/models/globalDataModels';
import type { MouseEvent } from 'react';

import {
	selectActivePrefillingGlobalDataSubsetDataKey,
	setActivePrefillingGlobalDataSubsetDataKey,
	setActivePrefillingGlobalDataSubsetKey,
} from '@/redux/features/ui/flow';

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

	const activePrefillingGlobalDataSubsetDataKey = useTypedSelector(
		selectActivePrefillingGlobalDataSubsetDataKey,
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			if (
				activePrefillingGlobalDataSubsetDataKey !==
				globalDataSubsetDataKey
			) {
				dispatch(
					setActivePrefillingGlobalDataSubsetKey(globalDataSubsetKey),
				);
				dispatch(
					setActivePrefillingGlobalDataSubsetDataKey(
						globalDataSubsetDataKey,
					),
				);
			}

			_e.stopPropagation();
		},
		[
			activePrefillingGlobalDataSubsetDataKey,
			dispatch,
			globalDataSubsetDataKey,
			globalDataSubsetKey,
		],
	);

	// const listItemHasActiveMapping = useMemo(
	// 	() =>
	// 		activePrefillingNode?.id === prefillingNode.id &&
	// 		activePrefillingNodeFormFieldSchemaPropertyKey ===
	// 			globalDataSubsetDataKey,
	// 	[
	// 		activePrefillingNode?.id,
	// 		activePrefillingNodeFormFieldSchemaPropertyKey,
	// 		prefillingNode.id,
	// 		globalDataSubsetDataKey,
	// 	],
	// );

	return (
		<li
			onClick={handleLIOnClick}
			className={clsx(
				classes.childRow,
				// listItemHasActiveOrSavedMapping &&
				// 	classes.hasActiveOrSavedMapping,
				// listItemHasUpdatedSavedMapping && classes.savedButUpdated,
			)}
		>
			<Row className="flex-1">
				<Col className="flex-1">{label}</Col>
				{/* {((listItemHasSavedMapping &&
					activePrefillingNodeFormFieldSchemaPropertyKey ===
						undefined) ||
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
				)} */}
			</Row>
		</li>
	);
}

const ChildListItem = memo(ChildListItemBase);

export default ChildListItem;
