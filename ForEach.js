/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
/**
 * Loops over arrays or objects and applies a given callback
 * @param {object|Array} object The array or object to iterate
 * @param {function} callback The callback to apply. Params are: (value, key)
 */
export function forEach(object, callback) {
	if(object === null || typeof object === 'undefined') return;
	if(Array.isArray(object)) object.forEach(callback);
	else Object.entries(object).forEach(v => {callback(v[1], v[0])});
}