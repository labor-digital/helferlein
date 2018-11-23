/**
 * Created by Martin Neundorfer on 29.08.2018.
 * For LABOR.digital
 */
import { forEach } from "./forEach";
/**
 * Helper to appliy a function against an accumulator and each element in the list to reduce it to a single value.
 *
 * Will work with Arrays, Objects, Map, Set
 *
 * @param value Either an array or an object to reduce
 * @param callback The reducer to use for the combination
 * @param initial The initial value
 */
export function reduce(value, callback, initial) {
    let out = initial;
    forEach(value, (v, k, it) => {
        out = callback(out, v, k, it);
    });
    return out;
}
