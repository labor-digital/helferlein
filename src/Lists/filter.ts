/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */

import {forEach, ForEachCallbackType} from "./forEach";
import {getListType, getNewList, ListType, setListValue} from "./listAccess";
import {List} from "../Interfaces/List";

export interface FilterCallback extends ForEachCallbackType {
}

/**
 * Works exactly the same as Array.filter() but with any valid list object
 * @param list
 * @param callback
 */
export function filter(list: List, callback: FilterCallback): any {
	const outputType = getListType(list);
	if (outputType === ListType.NoList) throw new Error("Could not determine the output type of a given element!");
	const output = getNewList(outputType);
	forEach(list, (v, k) => {
		if (callback(v, k, list) !== false) setListValue(output, v, k);
	});
	return output;
}