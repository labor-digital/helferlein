/**
 * Created by Martin Neundorfer on 20.09.2018.
 * For LABOR.digital
 */
/**
 * Returns true if the given value is a Map, false if not
 * @param object
 */
export function isMap(object: any): boolean {
	if (typeof object === "undefined" || object === null) return false;
	return object instanceof Map || object.constructor === Map;
}