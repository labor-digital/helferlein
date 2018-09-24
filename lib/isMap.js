/**
 * Created by Martin Neundorfer on 20.09.2018.
 * For LABOR.digital
 */
export function isMap(object) {
    if (typeof object === 'undefined' || object === null)
        return false;
    return object instanceof Map || object.constructor === 'Map';
}
