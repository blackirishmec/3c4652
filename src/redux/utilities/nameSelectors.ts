// Generate the final type-safe selector keys based on the prefix and selector names
type PrefixedSelectors<SelectorsType extends {}, Prefix extends string> = {
	[Key in keyof SelectorsType as `select${Capitalize<Prefix>}${Capitalize<string & Key>}`]: SelectorsType[Key];
};

// Utility to map and validate selectors with prefix
const nameSelectors = <SelectorsType extends {}, Prefix extends string>(
	prefix: Prefix,
	selectors: SelectorsType,
): PrefixedSelectors<SelectorsType, Prefix> => {
	return Object.fromEntries(
		Object.entries(selectors).map(([key, value]) => [
			`select${prefix.charAt(0).toUpperCase()}${prefix.slice(1)}${key.charAt(0).toUpperCase()}${key.slice(1)}`,
			value,
		]),
	) as PrefixedSelectors<SelectorsType, Prefix>;
};

export default nameSelectors;
