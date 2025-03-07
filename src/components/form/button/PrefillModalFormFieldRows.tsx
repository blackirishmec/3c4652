import { memo } from 'react';

import clsx from 'clsx';

import { selectFormFieldSchemaPropertiesArrayByActiveNode } from '@/redux/selectors/relationships/formRelationshipSelectors';
import {
	selectActiveNode,
	selectPrefillingEnabledByActiveNode,
} from '@/redux/selectors/relationships/nodeRelationshipSelectors';

import useTypedSelector from '@/hooks/useTypedSelector';

import FormFieldRow from '@/components/form/button/FormFieldRow';

const classes = {
	disabled: `
		pointer-events-none
		cursor-not-allowed!
		opacity-50
		line-through
		hover:bg-red-50
		hover:border-red-500!
	`,
} as const;

function PrefillModalFormFieldRowsBase() {
	const activeNode = useTypedSelector(selectActiveNode);
	const formFieldSchemaPropertiesArrayByActiveNode = useTypedSelector(
		selectFormFieldSchemaPropertiesArrayByActiveNode,
	);
	const prefillingEnabledByActiveNode = useTypedSelector(
		selectPrefillingEnabledByActiveNode,
	);

	return (
		activeNode !== undefined &&
		formFieldSchemaPropertiesArrayByActiveNode.map(property => {
			return (
				<FormFieldRow
					className={clsx(
						!prefillingEnabledByActiveNode && classes.disabled,
					)}
					key={property.key}
					property={property}
				/>
			);
		})
	);
}

const PrefillModalFormFieldRows = memo(PrefillModalFormFieldRowsBase);

export default PrefillModalFormFieldRows;
