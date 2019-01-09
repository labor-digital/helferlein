/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
 */
/**
 * Returns true if the given value is an object of some kind and NOT NULL
 * @param value
 * @param allowNull True if null should also return TRUE
 */
export function isObject(value, allowNull?:boolean): boolean {
	return typeof value === "object" && (allowNull === true || value !== null);
}