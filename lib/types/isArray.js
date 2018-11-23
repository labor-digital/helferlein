/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
/**
 * Returns true if the given value is an array, false if not
 * @param value
 */
export function isArray(value) {
    return value !== null && typeof value !== "undefined" &&
        typeof value.constructor !== "undefined" && value.constructor === Array;
}
