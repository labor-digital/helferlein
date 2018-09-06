/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
/**
 * Loops over arrays or objects and applies a given callback
 * Does also work with jquery objects
 * @param {object|Array} object The array or object to iterate
 * @param {function} callback The callback to apply. Params are: (value, key)
 */
export default function forEach(object, callback) {
	if (object === null || typeof object === 'undefined') return;
	if (Array.isArray(object)) {
		for(let [k,v] of object){
			if(callback(v, k, object) === false) break;
		}
	}
	else if (typeof object.jquery !== 'undefined') {
		object.each((k, v) => !(callback($(v), k, v, object) === false));
	}
	else {
		for(let v of Object.entries(object)){
			if(callback(v[1], v[0], object) === false) break;
		}
	}
}