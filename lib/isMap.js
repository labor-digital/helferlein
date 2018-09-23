// @todo test if this works with core-js polyfills
export function isMap(object) {
    if (typeof object === 'undefined' || object === null)
        return false;
    return object instanceof Map || object.constructor === 'Map';
}
