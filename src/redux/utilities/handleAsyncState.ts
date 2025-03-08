/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StatusState } from '@/types/StatusTypes';
import type {
	ActionReducerMapBuilder,
	AsyncThunk,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';

type KeysWithStatusState<S> = {
	[K in keyof S]: S[K] extends StatusState ? K : never;
}[keyof S];

type FulfilledCallback<S, P> = (
	state: Draft<S>,
	action: PayloadAction<
		P,
		string,
		{
			arg: any;
			requestId: string;
			requestStatus: 'fulfilled';
		},
		never
	>,
) => void;

type RejectedCallback<S> = (
	state: Draft<S>,
	action: PayloadAction<
		unknown,
		string,
		{
			arg: any;
			requestId: string;
			requestStatus: 'rejected';
			aborted: boolean;
			condition: boolean;
		} & (
			| {
					rejectedWithValue: true;
			  }
			| ({
					rejectedWithValue: false;
			  } & {})
		),
		unknown
	>,
) => void;

interface HandleAsyncStateParams<
	S extends Record<string, any>,
	K extends KeysWithStatusState<Draft<S>>,
	P,
> {
	builder: ActionReducerMapBuilder<S>;
	thunk: AsyncThunk<P, any, any>;
	statusStateProperty?: K;
	onFulfilled?: FulfilledCallback<S, P>;
	onPending?: (state: Draft<S>) => void;
	onRejected?: RejectedCallback<S>;
}

const handleAsyncState = <
	S extends Record<string, any>,
	K extends KeysWithStatusState<Draft<S>>,
	P,
>({
	builder,
	thunk,
	statusStateProperty,
	onFulfilled,
	onPending,
	onRejected,
}: HandleAsyncStateParams<S, K, P>): void => {
	builder
		.addCase(thunk.pending, (state: Draft<S>) => {
			if (statusStateProperty !== undefined) {
				(state[statusStateProperty] as StatusState).loading = 'loading';
				(state[statusStateProperty] as StatusState).error = null;
			}
			if (onPending) {
				onPending(state);
			}
		})
		.addCase(thunk.fulfilled, (state: Draft<S>, action) => {
			if (statusStateProperty !== undefined) {
				(state[statusStateProperty] as StatusState).loading =
					'succeeded';
				(state[statusStateProperty] as StatusState).error = null;
			}
			if (onFulfilled) {
				onFulfilled(state, action);
			}
		})
		.addCase(thunk.rejected, (state: Draft<S>, action) => {
			if (statusStateProperty !== undefined) {
				(state[statusStateProperty] as StatusState).loading = 'failed';
				(state[statusStateProperty] as StatusState).error =
					action.payload as string;
			}
			if (onRejected) {
				onRejected(state, action);
			}
		});
};

export default handleAsyncState;
