/**
 * Created by Martin Neundorfer on 20.09.2018.
 * For LABOR.digital
 */
export function isSet(object) {
    if (typeof object === 'undefined' || object === null)
        return false;
    return object instanceof Set || object.constructor === 'Set';
}
