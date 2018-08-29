/**
 * Created by Martin Neundorfer on 29.08.2018.
 * For LABOR.digital
 */
/**
 * Works like Array.map() but also for objects
 * @param {object|Array} object The array or object to iterate
 * @param {function} callback The callback to apply. Params are: (value, key)
 * @return {*}
 */
export default function map(object, callback){
	if(object === null || typeof object === 'undefined') return null;
	if(Array.isArray(object)) return object.map(callback);
	Object.entries(object).forEach(v => {
		object[v[0]] = callback(v[1], v[0])
	});
	return object;
}