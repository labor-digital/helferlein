/**
 * Created by Martin Neundorfer on 29.08.2018.
 * For LABOR.digital
 */
import {forEach} from "./forEach";
import {List} from "../Interfaces/List";
import {getListType, getNewList, ListType, setListValue} from "./listAccess";

interface MapCallbackType {
	/**
	 * Called on every property of the iterade object
	 * @param value
	 * @param key
	 * @param iteratedObject
	 */
	(value?, key?: string | number, iteratedObject?): any
}

/**
 * Works like Array.map() but also for objects
 * @param list The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 */
export function map(list: List, callback: MapCallbackType): any {
	const outputType = getListType(list);
	if (outputType === ListType.NoList) throw new Error("Could not determine the output type of a given element!");
	const output = getNewList(outputType);
	forEach(list, (v, k) => {
		setListValue(output, callback(v, k, list), k);
	});
	return output;
}