/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import {forEach} from "../Lists/forEach";
import {List} from "../Interfaces/List";
import {getListType, ListType} from "../Lists/listAccess";

/**
 * Converts a given object/map/set into an array
 * @param list
 * @return {Array}
 */
export function asArray(list: List): Array<any> {
	if (list === null || typeof list === "undefined") return [];
	const outputType = getListType(list);
	if (outputType === ListType.NoList) throw new Error("Could not determine the output type of a given element!");
	const output = [];
	forEach(list, v => output.push(v));
	return output;
}