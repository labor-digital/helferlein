/**
 * Loops over arrays or objects and applies a given callback
 * Does also work with jquery objects
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 */
export function forEach(object, callback) {
    if (object === null || typeof object === 'undefined')
        return;
    if (Array.isArray(object)) {
        for (const k in object) {
            const v = object[k];
            if (callback(v, k, object) === false)
                break;
        }
    }
    else if (typeof object.jquery !== 'undefined') {
        object.each((k, v) => !(callback($(v), k, v, object) === false));
    }
    else if (typeof object.forEach === 'function') {
        try {
            object.forEach((v, k) => {
                if (callback(v, k, object) === false)
                    throw new Error('BREAK');
            });
        }
        catch (e) {
            if (e.toString() === 'BREAK')
                return;
            throw e;
        }
    }
    else {
        for (const k in object) {
            if (!object.hasOwnProperty(k))
                continue;
            const v = object[k];
            if (callback(v, k, object) === false)
                break;
        }
    }
}
