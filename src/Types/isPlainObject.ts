/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
 */
/**
 * Returns true if the given value is a child of a plain object created with {} or new Object()
 * @param value
 */
export function isPlainObject(value): boolean {
	return typeof value === "object" && Object.prototype.toString.call(value) === '[object Object]' &&
		typeof value.constructor === "function" && value.constructor.prototype.hasOwnProperty("isPrototypeOf");
}