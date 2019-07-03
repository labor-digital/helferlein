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
 * Last modified: 2019.07.02 at 15:26
 */

import {isFunction} from "../Types/isFunction";
import {isObject} from "../Types/isObject";

/**
 * Can be used to html-encode a given string and return the result.
 *
 * ATTENTION: This only works if you are using it inside a browser, or have a working js dom,
 * that is linked to the global document variable.
 *
 * @param code
 */
export function htmlEncode(code: string): string {
	// Check if we have a dom
	if (!isObject(document) || !isFunction(document.createElement)) {
		console.error("htmlEncode() failed! Make sure you have a DOM document to work with!");
		return code;
	}
	
	// Translate the element
	let elt = document.createElement("span");
	elt.textContent = code;
	return elt.innerHTML;
}