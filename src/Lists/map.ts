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
 * Last modified: 2019.01.09 at 12:58
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