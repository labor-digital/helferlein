/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
/**
 * Returns true if the given value is a number, false if not
 * @param value
 */
export function isNumber(value):boolean {
	return typeof value === "number" && !isNaN(value);
}