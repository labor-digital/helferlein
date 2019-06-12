/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.01.10 at 10:18
 */
import {asArray} from "../FormatAndConvert/asArray";
import {List} from "../Interfaces/List";
import {isIterator} from "../Types/isIterator";
import {isMap} from "../Types/isMap";
import {isPlainObject} from "../Types/isPlainObject";
import {isSet} from "../Types/isSet";
import {isUndefined} from "../Types/isUndefined";
import {forEach} from "./forEach";

export enum ListType {
	Array, Set, Map, Object, NoList, Iterator
}

/**
 * Returns an enum of ListType which defines the type of list that was given
 * @param element
 */
export function getListType(element: any): ListType {
	if (Array.isArray(element)) return ListType.Array;
	else if (isSet(element)) return ListType.Set;
	else if (isMap(element)) return ListType.Map;
	else if (isPlainObject(element)) return ListType.Object;
	else if (isIterator(element)) return ListType.Iterator;
	return ListType.NoList;
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
	if (type === ListType.Iterator) return [];
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
	if (type === ListType.Set || type === ListType.Iterator) {
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
	if (type === ListType.Iterator) throw new Error("Can't set the value of an iterator!");
	if (type === ListType.Array) (list as Array<any>).push(value);
	else if (type === ListType.Set) (list as Set<any>).add(value);
	else if (type === ListType.Map && !isUndefined(key)) (list as Map<any, any>).set(key, value);
	else if (type === ListType.Object && !isUndefined(key)) list[key] = value;
	else throw new Error("The given list type requires a \"key\" value to be specified!");
}

/**
 * Returns the list of all keys of the given list element
 * @param list
 */
export function getListKeys(list: List): Array<string | number> {
	let type = getListType(list);
	let keys = [];
	if (type === ListType.NoList) throw new Error("Invalid list type given!");
	if (type === ListType.Iterator) {
		list = asArray(list);
		type = ListType.Array;
	}
	if (type === ListType.Array) for (var i = 0; i < (list as Array<any>).length; i++) keys.push(i);
	else if (type === ListType.Set) for (var i = 0; i < (list as Set<any>).size; i++) keys.push(i);
	else if (type === ListType.Map) keys = asArray((list as Map<any, any>).keys());
	else if (type === ListType.Object) keys = asArray(Object.keys((list as Object)));
	return keys;
}