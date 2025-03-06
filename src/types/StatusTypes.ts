export type ErrorState = string | null;

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface StatusState {
	loading: LoadingState;
	error: ErrorState;
}
