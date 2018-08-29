/**
 * Created by Martin Neundorfer on 29.08.2018.
 * For LABOR.digital
 */
/**
 * Helper to appliy a function against an accumulator and each element in the array
 * (or an object) to reduce it to a single value.
 *
 * @param {Array|object} value Either an array or an object to reduce
 * @param {function} callback The reducer to use for the combination
 * @param {*} [initial] The initial value
 * @return {*}
 */
export default function reduce(value, callback, initial){
	if(Array.isArray(value)) return value.reduce(callback, initial);
	if(typeof value !== 'object') return value;
	let out = initial;
	Object.entries(value).forEach(v => {
		out = callback(out, v[1], v[0], v);
	});
	return out;
}