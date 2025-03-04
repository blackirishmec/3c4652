import React, { useMemo } from 'react';

import type { ReactNode } from 'react';

type PositionValue = 'start' | 'center' | 'end';

const alignItemsMap = {
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
};

const justifyContentMap = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
};

export interface RowProps {
	/** The content to be rendered inside the row. */
	children?: ReactNode;
	/** Horizontal alignment of the children inside the row. */
	childrenHorizontalPosition?: PositionValue;
	/** Vertical alignment of the children inside the row. */
	childrenVerticalPosition?: PositionValue;
	className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export const Row = React.memo(function ({
	children,
	childrenHorizontalPosition,
	childrenVerticalPosition,
	className: propClassName = '',
}: RowProps) {
	const alignItemsClassName = useMemo(
		() =>
			childrenVerticalPosition && alignItemsMap[childrenVerticalPosition],
		[childrenVerticalPosition],
	);

	const justifyContentClassName = useMemo(
		() =>
			childrenHorizontalPosition &&
			justifyContentMap[childrenHorizontalPosition],
		[childrenHorizontalPosition],
	);

	const className = useMemo(
		() =>
			`flex flex-row${justifyContentClassName !== undefined ? ' ' + justifyContentClassName : ''}${alignItemsClassName !== undefined ? ' ' + alignItemsClassName : ''}${propClassName && ' ' + propClassName}`,
		[alignItemsClassName, justifyContentClassName, propClassName],
	);

	return <div className={className}>{children}</div>;
});

export interface ColProps {
	/** The content to be rendered inside the row. */
	children?: ReactNode;
	/** Horizontal alignment of the children inside the row. */
	childrenHorizontalPosition?: PositionValue;
	/** Vertical alignment of the children inside the row. */
	childrenVerticalPosition?: PositionValue;
	className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export const Col = React.memo(function ({
	children,
	childrenHorizontalPosition,
	childrenVerticalPosition,
	className: propClassName = '',
}: ColProps) {
	const alignItemsClassName = useMemo(
		() =>
			childrenHorizontalPosition &&
			alignItemsMap[childrenHorizontalPosition],
		[childrenHorizontalPosition],
	);

	const justifyContentClassName = useMemo(
		() =>
			childrenVerticalPosition &&
			justifyContentMap[childrenVerticalPosition],
		[childrenVerticalPosition],
	);

	const className = useMemo(
		() =>
			`flex flex-col${justifyContentClassName !== undefined ? ' ' + justifyContentClassName : ''}${alignItemsClassName !== undefined ? ' ' + alignItemsClassName : ''}${propClassName && ' ' + propClassName}`,
		[alignItemsClassName, justifyContentClassName, propClassName],
	);

	return <div className={className}>{children}</div>;
});
