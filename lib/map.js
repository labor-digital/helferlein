/**
 * Created by Martin Neundorfer on 29.08.2018.
 * For LABOR.digital
 */
import { isSet } from "./isSet";
import { forEach } from "./forEach";
import { isMap } from "./isMap";
/**
 * Works like Array.map() but also for objects
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 */
export function map(object, callback) {
    if (isSet(object)) {
        let result = new Set();
        forEach(object, (v, k) => {
            result.add(callback(v, k, object));
        });
        return result;
    }
    if (isMap(object)) {
        let result = new Map();
        forEach(object, (v, k) => {
            result.set(k, callback(v, k, object));
        });
        return result;
    }
    let result = Array.isArray(object) ? [] : {};
    forEach(object, (v, k) => {
        result[k] = callback(v, k, object);
    });
    return result;
}
