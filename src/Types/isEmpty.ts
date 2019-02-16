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
 * Last modified: 2019.01.23 at 17:52
 */
import {isArray} from "./isArray";
import {isMap} from "./isMap";
import {isSet} from "./isSet";
import {isPlainObject} from "./isPlainObject";

/**
 * Returns true if the given value counts as empty
 * Empty values are: NULL, undefined, 0, "", " ", {}, [] and empty Maps and Sets
 * @param value
 * @param includeZero By default zero (0) is not seen as "empty" if you set this to true, it will be, tho
 */
export function isEmpty(value, includeZero?:boolean):boolean {
	if(value === null) return true;
	switch (typeof value) {
		case "undefined":
			return true;
		case "string":
			return value.trim().length === 0 || includeZero === true && value === "0";
		case "number":
			return includeZero === true ? value === 0 : false;
		case "object":
			if(isPlainObject(value)) return Object.keys(value).length === 0;
			if(isArray(value)) return value.length === 0;
			if(isMap(value) || isSet(value)) return value.size === 0;
	}
	return false;
}