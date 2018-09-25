/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import { forEach } from "./forEach";
/**
 * Converts a given object/map/set/array into a generic object literal
 * @param object
 */
export function asObject(object) {
    let out = {};
    forEach(object, (v, k) => {
        out[k] = v;
    });
    return out;
}
