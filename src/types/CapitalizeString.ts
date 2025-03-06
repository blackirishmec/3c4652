export type CapitalizeString<S extends string> =
	S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S;
