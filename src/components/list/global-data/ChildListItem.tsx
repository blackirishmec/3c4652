import { memo, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { PiXCircleFill } from 'react-icons/pi';

import type { MouseEvent } from 'react';

import { Col, Row } from '@/components/layout/FlexComponents';

import classes from '@/styles/childListItemClasses';

export interface ChildListItemProps {
	prefillingNodeFormFieldSchemaPropertyKey: string;
}

function ChildListItemBase({
	prefillingNodeFormFieldSchemaPropertyKey,
}: ChildListItemProps) {
	const label = useMemo(
		() => prefillingNodeFormFieldSchemaPropertyKey,
		[prefillingNodeFormFieldSchemaPropertyKey],
	);

	const handleLIOnClick = useCallback(
		(_e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>): void => {
			_e.stopPropagation();
		},
		[],
	);

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
