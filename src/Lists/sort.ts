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
 * Last modified: 2019.02.01 at 18:58
 */
import {List, ListPath} from "../Interfaces/List";
import {isNull} from "../Types/isNull";
import {isUndefined} from "../Types/isUndefined";
import {forEach} from "./forEach";
import {getListType, getNewList, setListValue} from "./listAccess";
import {getPath} from "./Paths/getPath";

/**
 * Can be used to sort arrays containing objects by a property of said objects
 * Can also be used to sort plain objects, containing other objects in the same way
 *
 * @param list the list to sort
 * @param by The property of the child objects to sort by
 * @param desc If set to true the result will be sorted descending instead of the default which is ascending
 */
export function sort(list: List, by?: ListPath | null, desc?: boolean): List {
	// Build the sorter
	let sorter = [];
	forEach(list, (v, k) => {
		sorter.push({
			by: isNull(by) || isUndefined(by) ? v : getPath(v, by),
			k, v
		});
	});
	
	// Sort the sorter array
	sorter = sorter.sort((a, b) =>
		desc ?
			((a.by > b.by) ? -1 : ((a.by < b.by) ? 1 : 0)) :
			((a.by < b.by) ? -1 : ((a.by > b.by) ? 1 : 0)));
	
	// Build result
	const result = getNewList(getListType(list));
	forEach(sorter, (o) => setListValue(result, o.v, o.k));
	return result;
}