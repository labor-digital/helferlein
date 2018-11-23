/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import {forEach} from "../iteration/forEach";

/**
 * Converts a given object/map/set into an array
 * @param object
 * @return {Array}
 */
export function asArray(object): Array<any>
{
	if (object === null || typeof object === "undefined") return [];
	let out = [];
	forEach(object, v => {
		out.push(v);
	});
	return out;
}