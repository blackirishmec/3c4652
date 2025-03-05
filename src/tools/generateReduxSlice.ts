import inquirer from 'inquirer';

import fs from 'fs';
import path from 'path';

interface SliceAnswers {
	parentFolder: 'model' | 'ui';
	sliceName: string;
	files: string[];
}

const REDUX_BASE_PATH = path.join(process.cwd(), 'src', 'redux', 'features');

const modelFileTemplates = {
	'index.ts': `export * from './types';
export * from './selectors';
export * from './{name}Adapter';
export {
    upsertMany{Name}s,
    upsert{Name},
    removeAll{Name}s,
    remove{Name},
} from './slice';
export { default as {name}sReducer } from './slice';`,

	'adapter.ts': `import { createEntityAdapter } from '@reduxjs/toolkit';
import { {Name} } from '../../../../interfaces/db_models/{name}Models';

export const {name}sAdapter = createEntityAdapter<{Name}, number>({
    selectId: {name} => {name}.id,
    sortComparer: false,
});`,

	'initialState.ts': `import { {name}sAdapter } from './{name}sAdapter';
import { {Name}sState } from './types';

export const initialState: {Name}sState = {name}sAdapter.getInitialState();`,

	'selectors.ts': `import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { {name}sAdapter } from './{name}sAdapter';
import { {Name} } from '../../../../interfaces/db_models/{name}Models';

const select{Name}sState = (state: RootState) => state.{name}s;

export const {
    selectAll: selectAll{Name}s,
    selectById: select{Name}ById,
    selectIds: select{Name}Ids,
} = {name}sAdapter.getSelectors(select{Name}sState);

export const select{Name}NamesById = createSelector(
    [selectAll{Name}s],
    {name}s =>
        {name}s.reduce(
            (acc, {name}) => ({
                ...acc,
                [{name}.id]: {name}.name,
            }),
            {} as Record<{Name}['id'], {Name}['name']>,
        ),
);`,

	'slice.ts': `import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { {name}sAdapter } from './{name}sAdapter';
import { {name}Fetched, {name}sFetched } from './actions';

const {name}sSlice = createSlice({
    name: '{name}s',
    initialState,
    reducers: {
        upsert{Name}: {name}sAdapter.upsertOne,
        remove{Name}: {name}sAdapter.removeOne,
        upsertMany{Name}s: {name}sAdapter.upsertMany,
        removeAll{Name}s: {name}sAdapter.removeAll,
    },
    extraReducers(builder) {
        builder
            .addCase({name}Fetched, (state, { payload: loggedIn{Name} }) => {
                {name}sAdapter.upsertOne(state, loggedIn{Name});
            })
            .addCase({name}sFetched, (state, { payload: {name}s }) => {
                {name}sAdapter.upsertMany(state, {name}s);
            });
    },
});

export const {
    upsertMany{Name}s,
    upsert{Name},
    removeAll{Name}s,
    remove{Name},
} = {name}sSlice.actions;

export default {name}sSlice.reducer;`,

	'types.ts': `import { EntityState } from '@reduxjs/toolkit';
import { {Name} } from '../../../../interfaces/db_models/{name}Models';

export interface {Name}sState extends EntityState<{Name}, number> {}`,

	'actions.ts': `import { createAction } from '@reduxjs/toolkit';
import { {Name} } from '../../../../interfaces/db_models/{name}Models';

export const {name}Fetched = createAction<{Name}>('{name}s/{name}Fetched');
export const {name}sFetched = createAction<{Name}[]>('{name}s/{name}sFetched');`,

	'thunks.ts': `import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../main';
import { {Name} } from '../../../../interfaces/db_models/{name}Models';
import { LaravelArrayResource, LaravelResource } from '../../../interfaces/resources/laravelResources';
import { LaravelArrayResponse, LaravelResponse } from '../../../../services/LaravelResponseService';
import { {Name}Resource } from '../../../interfaces/resources/{name}Resources';
import { transform{Name}Resource, transform{Name}Resources } from '../../../transformers/{name}Transformers';
import axios from 'axios';

export const fetch{Name} = createAsyncThunk<{Name}, {Name}['id']>(
    '{name}s/fetch{Name}',
    async ({name}Id, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelResource<{Name}Resource>>(
                '/{name}s/' + {name}Id,
            );

            const laravelResponse = new LaravelResponse(response.data);
            const { {name} } = transform{Name}Resource(laravelResponse.item);

            return {name};
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);

export const fetch{Name}s = createAsyncThunk<{Name}[], void>(
    '{name}s/fetch{Name}s',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<LaravelArrayResource<{Name}Resource>>(
                '/{name}s',
            );

            const laravelResponse = new LaravelArrayResponse(response.data);
            const { {name}s } = transform{Name}Resources(laravelResponse.items);

            return {name}s;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);`,
};

const uiFileTemplates = {
	'index.ts': `export * from './types';
export * from './selectors';
export { reset{Name} } from './slice';
export { default as {name}Reducer } from './slice';`,

	'initialState.ts': `import { statusInitialState } from '../../../initialStates/statusInitialState';
import { {Name}State } from './types';

export const initialState: {Name}State = {
    fetch{Name}Status: statusInitialState,
    lastFetch{Name}: undefined,
};`,

	'selectors.ts': `import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { createStatusSelectors } from '../../../utilities/createStatusSelectors';

export const select{Name}State = (state: RootState) => state.{name};

export const fetch{Name}StatusSelectors = createStatusSelectors(
    'fetch{Name}',
    (state: RootState) => state.{name}.fetch{Name}Status,
);

export const select{Name}Loaded = createSelector(
    [select{Name}State],
    {name} => {name}.lastFetch{Name} !== undefined,
);

export const select{Name}IsLoading = createSelector(
    [select{Name}State],
    {name} => {name}.fetch{Name}Status.loading === 'loading',
);

export const selectLastFetch{Name} = createSelector(
    [select{Name}State],
    {name} => {name}.lastFetch{Name},
);`,

	'slice.ts': `import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import handleAsyncState from '../../../utilities/handleAsyncState';
import { fetch{Name} } from './thunks';

const {name}Slice = createSlice({
    name: '{name}',
    initialState,
    reducers: {
        reset{Name}: state => {
            state.fetch{Name}Status = { ...initialState.fetch{Name}Status };
            state.lastFetch{Name} = initialState.lastFetch{Name};
        },
    },
    extraReducers: builder => {
        handleAsyncState({
            builder,
            thunk: fetch{Name},
            statusStateProperty: 'fetch{Name}Status',
            onFulfilled(state) {
                state.lastFetch{Name} = new Date();
            },
        });
    },
});

export const { reset{Name} } = {name}Slice.actions;

export default {name}Slice.reducer;`,

	'types.ts': `import { StatusState } from '../../../types/status';

export interface {Name}State {
    fetch{Name}Status: StatusState;
    lastFetch{Name}?: Date;
}`,

	'actions.ts': `import { createAction } from '@reduxjs/toolkit';

export const {name}ActionExample = createAction('{name}/actionExample');`,

	'thunks.ts': `import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import axios from 'axios';

export const fetch{Name} = createAsyncThunk<void, void, { state: RootState }>(
    '{name}/fetch{Name}',
    async (_, { rejectWithValue }) => {
        try {
            // Add async logic here
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            }
            return rejectWithValue((error as Error).message);
        }
    },
);`,
};

async function generateReduxSlice() {
	const answers = await inquirer.prompt<SliceAnswers>([
		{
			type: 'list',
			name: 'parentFolder',
			message: 'Select the parent folder for the slice:',
			choices: ['model', 'ui'],
		},
		{
			type: 'input',
			name: 'sliceName',
			message: 'Enter the name of the slice (in camelCase):',
			validate: (input: string) => {
				if (input.length === 0) return 'Slice name cannot be empty';
				if (!/^[a-z][a-zA-Z0-9]*$/.test(input))
					return 'Slice name must be in camelCase';
				return true;
			},
		},
		{
			type: 'checkbox',
			name: 'files',
			message: 'Select the files to generate:',
			choices: [
				'index.ts',
				'initialState.ts',
				'adapter.ts',
				'selectors.ts',
				'slice.ts',
				'thunks.ts',
				'types.ts',
				'actions.ts',
			],
			default: [
				'index.ts',
				'initialState.ts',
				'adapter.ts',
				'selectors.ts',
				'slice.ts',
				'thunks.ts',
				'types.ts',
				'actions.ts',
			],
		},
	]);

	const slicePath = path.join(
		REDUX_BASE_PATH,
		answers.parentFolder,
		answers.sliceName,
	);
	const templates =
		answers.parentFolder === 'model' ? modelFileTemplates : uiFileTemplates;

	// Create the slice directory
	if (!fs.existsSync(slicePath)) {
		fs.mkdirSync(slicePath, { recursive: true });
	}

	// Generate each selected file
	for (const file of answers.files) {
		if (answers.parentFolder === 'ui' && file === 'adapter.ts') {
			console.log('Skipping adapter.ts for UI slice');
			continue;
		}

		const template = templates[file];
		if (!template) {
			console.log(`No template found for ${file}`);
			continue;
		}

		const filePath = path.join(slicePath, file);
		const fileContent = template
			.replace(/{name}/g, answers.sliceName)
			.replace(
				/{Name}/g,
				answers.sliceName.charAt(0).toUpperCase() +
					answers.sliceName.slice(1),
			);

		fs.writeFileSync(filePath, fileContent);
		console.log(`Generated ${file}`);
	}

	console.log(
		`\nRedux slice "${answers.sliceName}" has been generated in ${slicePath}`,
	);
}

generateReduxSlice().catch(console.error);
