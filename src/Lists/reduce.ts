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
 * Last modified: 2019.01.09 at 12:59
 */
import {forEach} from "./forEach";
import {List} from "../Interfaces/List";

interface ReduceCallbackType {
	/**
	 * Is called on every element of the iterated list
	 * @param current The combined value of all predecessors
	 * @param value The current value
	 * @param key The key of the current value
	 * @param list The iterated list
	 */
	(current: any, value?: any, key?: string | number, list?: any): any
}

/**
 * Helper to appliy a function against an accumulator and each element in the list to reduce it to a single value.
 *
 * Will work with Arrays, Objects, Map, Set
 *
 * @param list Either an array or an object to reduce
 * @param callback The reducer to use for the combination
 * @param initial The initial value
 */
export function reduce(list: List, callback: ReduceCallbackType, initial?:any):any {
	let out = initial;
	forEach(list, (v, k, it) => {
		out = callback(out, v, k, it);
	});
	return out;
}