/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {List} from "../Interfaces/List";

/**
 * Converts a given object/map/set/array into a generic object literal
 * @param object
 */
export function asObject(object:List): PlainObject {
	const out = {};
	forEach(object, (v,k) => out[k] = v);
	return out;
}