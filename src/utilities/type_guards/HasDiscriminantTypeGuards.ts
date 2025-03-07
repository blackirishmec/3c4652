import isNonNullObject from './IsNonNullObjectTypeGuards';

/**
 * Checks if the given object has a discriminant property with the specified value.
 *
 * @template T - The type of the discriminant value.
 * @param object - The object to check.
 * @param discriminant - The value of the discriminant property to check for.
 * @returns True if the object is a non-null object and has a discriminant property with the specified value, otherwise false.
 */
export default function hasDiscriminant<T extends string>(
	object: unknown,
	discriminant: T,
): object is { discriminant: T } {
	return (
		isNonNullObject(object) &&
		'discriminant' in object &&
		typeof discriminant === 'string' &&
		discriminant.trim().length > 0 &&
		typeof object.discriminant === 'string' &&
		object.discriminant.trim().length > 0 &&
		object.discriminant === discriminant
	);
}
