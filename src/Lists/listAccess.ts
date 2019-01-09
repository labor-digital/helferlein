/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
 */
import {isSet} from "../Types/isSet";
import {isMap} from "../Types/isMap";
import {forEach} from "./forEach";
import {isUndefined} from "../Types/isUndefined";
import {List} from "../Interfaces/List";
import {isPlainObject} from "@labor/helferlein/lib/types/isPlainObject";

export enum ListType {
	Array, Set, Map, Object, NoList
}

/**
 * Returns an enum of ListType which defines the type of list that was given
 * @param element
 */
export function getListType(element: any): ListType {
	// Skip if this type is not relevant
	if (["number", "string", "undefined", "function", "boolean"].indexOf(typeof element) !== -1)
		return ListType.NoList;
	if (Array.isArray(element)) return ListType.Array;
	else if (isSet(element)) return ListType.Set;
	else if (isMap(element)) return ListType.Map;
	else if (isPlainObject(element)) return ListType.Object;
}

/**
 * Returns a new list object based on the given list type
 * @param type
 */
export function getNewList(type: ListType): List {
	if (type === ListType.Array) return [];
	if (type === ListType.Set) return new Set();
	if (type === ListType.Map) return new Map();
	if (type === ListType.Object) return {};
	return null;
}

/**
 * Returns the value of a given list at a given key
 * @param list
 * @param key
 */
export function getListValue(list: List, key): undefined | any {
	const type = getListType(list);
	if (type === ListType.NoList) throw new Error("Invalid list type given!");
	if (type === ListType.Array) return list[key];
	if (type === ListType.Set) {
		let out = undefined;
		forEach(list, (v, k) => {
			if (k !== key) return;
			out = v;
			return false;
		});
		return out;
	}
	if (type === ListType.Map) return (list as Map<any, any>).get(key);
	if (type === ListType.Object) return list[key + ""];
	return undefined;
}

/**
 * Sets a value for a given key in the given list.
 *
 * @param list
 * @param key
 * @param value
 */
export function setListValue(list: List, value, key?) {
	const type = getListType(list);
	if (type === ListType.NoList) throw new Error("Invalid list type given!");
	if (type === ListType.Array) (list as Array<any>).push(value);
	else if (type === ListType.Set) (list as Set<any>).add(value);
	else if (type === ListType.Map && !isUndefined(key)) (list as Map<any, any>).set(key, value);
	else if (type === ListType.Object && !isUndefined(key)) list[key] = value;
	else throw new Error("The given list type requires a \"key\" value to be specified!");
}