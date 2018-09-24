/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import {forEach} from "./forEach";
import {GenericObject} from "./Interfaces";

/**
 * Converts a given object/map/set/array into a generic object literal
 * @param object
 */
export function asObject(object): GenericObject {
	let out = {};
	console.log(object);
	forEach(object, (v,k) => {
		console.log(v,k);
		out[k] = v;
	});
	return out;
}