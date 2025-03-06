import type { CapitalizeString } from '@/types/CapitalizeString';
import type { StatusState } from '@/types/StatusTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

/**
 * Type representing the set of reducers generated for a given property.
 */
type CreateStatusReducersType<SliceState, K extends string> = {
	[R in `reset${CapitalizeString<K>}Error`]: (
		state: SliceState,
		action: PayloadAction<void>,
	) => void;
} & {
	[R in `reset${CapitalizeString<K>}Loading`]: (
		state: SliceState,
		action: PayloadAction<void>,
	) => void;
} & {
	[R in `reset${CapitalizeString<K>}`]: (
		state: SliceState,
		action: PayloadAction<void>,
	) => void;
} & {
	[R in `set${CapitalizeString<K>}Error`]: (
		state: SliceState,
		action: PayloadAction<StatusState['error']>,
	) => void;
} & {
	[R in `set${CapitalizeString<K>}Loading`]: (
		state: SliceState,
		action: PayloadAction<StatusState['loading']>,
	) => void;
};

/**
 * Utility to create reducers for managing Status in the state.
 *
 * @param statusPropertyName - The name of the state property that holds the Status.
 * @returns An object containing the generated reducers with dynamically named keys.
 */
function createStatusReducers<
	SliceState extends Record<K, StatusState>,
	K extends Extract<keyof SliceState, string>,
>(
	initialState: SliceState,
	statusPropertyName: K,
): CreateStatusReducersType<SliceState, K> {
	const capitalizedStatusPropertyName =
		statusPropertyName.charAt(0).toUpperCase() +
		statusPropertyName.slice(1);

	return {
		[`reset${capitalizedStatusPropertyName}Error`]: (state: SliceState) => {
			state[statusPropertyName].error =
				initialState[statusPropertyName].error;
		},

		[`reset${capitalizedStatusPropertyName}Loading`]: (
			state: SliceState,
		) => {
			state[statusPropertyName].loading =
				initialState[statusPropertyName].loading;
		},

		[`reset${capitalizedStatusPropertyName}`]: (state: SliceState) => {
			state[statusPropertyName].error =
				initialState[statusPropertyName].error;
			state[statusPropertyName].loading =
				initialState[statusPropertyName].loading;
		},

		[`set${capitalizedStatusPropertyName}Error`]: (
			state: SliceState,
			action: PayloadAction<StatusState['error']>,
		) => {
			state[statusPropertyName].error = action.payload;
		},

		[`set${capitalizedStatusPropertyName}Loading`]: (
			state: SliceState,
			action: PayloadAction<StatusState['loading']>,
		) => {
			state[statusPropertyName].loading = action.payload;
		},
	} as CreateStatusReducersType<SliceState, K>;
}

export default createStatusReducers;
