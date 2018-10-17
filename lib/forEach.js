/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import { isSet } from "./isSet";
const breaker = new Error();
breaker.breaker = true;
/**
 * Loops over arrays or objects and applies a given callback
 *
 * Will work with Arrays, Objects, Map, Set and jQuery objects.
 * If jQuery is used the callback params are: ($jQueryValue, key, value, iteratedObject)
 *
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key, iteratedObject)
 */
export function forEach(object, callback) {
    if (object === null || typeof object === "undefined")
        return;
    if (typeof object.forEach === "function") {
        const objectIsSet = isSet(object);
        try {
            let c = 0;
            object.forEach((v, k) => {
                if (callback(v, objectIsSet ? c : k, object) === false)
                    throw breaker;
                ++c;
            });
        }
        catch (e) {
            if (e.breaker === true)
                return;
            throw e;
        }
        return;
    }
    else if (typeof object.jquery !== "undefined") {
        //noinspection TypeScriptValidateTypes
        object.each((k, v) => !(callback(jQuery(v), k, v, object) === false));
        return;
    }
    else if (typeof object === "object" || typeof object === "function") {
        for (let k in object) {
            if (!object.hasOwnProperty(k))
                continue;
            let kReal = k;
            if (parseInt(k) + "" === k)
                kReal = parseInt(k);
            if (callback(object[k], kReal, object) === false)
                break;
        }
        return;
    }
    throw Error("Could not iterate given object!");
}
