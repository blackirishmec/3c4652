/**
 * Checks if the given value is a non-null object.
 *
 * This function determines whether the provided `value` is an object and not null.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object, otherwise `false`.
 */
export default function isNonNullObject(
	value: unknown,
): value is Record<string, unknown> {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}
