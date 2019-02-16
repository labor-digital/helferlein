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
import {isArray} from "../Types/isArray";
import {isPlainObject} from "../Types/isPlainObject";
import {PlainObject} from "../Interfaces/PlainObject";

/**
 * Can be used to sort arrays containing objects by a property of said objects
 * Can also be used to sort plain objects, containing other objects in the same way
 *
 * @param list the list to sort
 * @param by The property of the child objects to sort by
 */
export function sort(list: Array<PlainObject | any> | PlainObject, by: string | number) {
	// Sort array lists
	if (isArray(list)) {
		return list.sort(function (a, b) {
			var x = a[by];
			var y = b[by];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	// Sort plain objects
	if (isPlainObject(list)) {
		// Create sortable array out of given object
		const sorter = Object.keys(list).reduce((a, v) => {
			a.push({by: list[v][by], key: v, v: list[v]});
			return a;
		}, []);

		// Sort the array and rebuild the object out of it
		return (sort(sorter, "by") as Array<PlainObject>)
			.reduce((a, v) => {
				a[v.key] = v.v;
				return a;
			}, {});
	}
}