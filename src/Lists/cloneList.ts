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
 * Last modified: 2019.12.30 at 21:08
 */

import {List} from "../Interfaces/List";
import {forEach} from "./forEach";
import {getListType, getNewList, ListType} from "./listAccess";

/**
 * Internal helper to recursively clone the children of a given list
 * @param list
 */
function cloneListCloner(list: List): List {
	const clone = getNewList(getListType(list));
	forEach(list, (v, k) => {
		if (getListType(v) === ListType.NoList) clone[k] = v;
		else clone[k] = cloneListCloner(v);
	});
	return clone;
}

/**
 * Small helper to deep-clone a list, or list-tree of any type.
 * @param list The list to be cloned
 */
export function cloneList(list: List): List {
	return cloneListCloner(list);
}