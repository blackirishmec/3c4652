import { memo } from 'react';

import type { HTMLAttributes } from 'react';

const classes = {
	childRow: `
		cursor-pointer 
		border 
		rounded-sm 
		border-dashed 
		border-transparent 
		py-1
		pl-10
		hover:border-green-500!
		hover:bg-green-100 
	`,
} as const;

export interface PrefillMappingChildListItemProps
	extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
	label?: string;
}

function PrefillMappingChildListItemBase({
	label,
}: PrefillMappingChildListItemProps) {
	return <li className={classes.childRow}>{label}</li>;
}

const PrefillMappingChildListItem = memo(PrefillMappingChildListItemBase);

export default PrefillMappingChildListItem;
