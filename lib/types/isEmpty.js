/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import { isArray } from "./isArray";
import { isMap } from "./isMap";
import { isSet } from "./isSet";
/**
 * Returns true if the given value counts as empty
 * Empty values are: NULL, undefined, 0, "", " ", {}, [] and empty Maps and Sets
 * @param value
 */
export function isEmpty(value) {
    if (value === null)
        return true;
    switch (typeof value) {
        case "undefined":
            return true;
        case "number":
            return value === 0;
        case "string":
            return value.trim().length === 0;
        case "object":
            if (jQuery.isPlainObject(value))
                return jQuery.isEmptyObject(value);
            if (isArray(value))
                return value.length === 0;
            if (isMap(value) || isSet(value))
                return value.size() === 0;
    }
    return false;
}
