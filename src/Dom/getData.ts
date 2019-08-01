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
 * Last modified: 2019.02.06 at 12:03
 */

import {isObject} from "../Types/isObject";
import {isString} from "../Types/isString";

/**
 * This helper receives a html element and extracts either a single,
 * or all data attributes from it. It can also accept a default, which
 * is returned if the given element has no data with the required selector
 *
 * @param element The html element to get the data from
 * @param selector Optionally, the name of the data attribute to read from (data-)some-attribute. (The data- part is optional)
 * @param fallback Optional value which will be returned if the data attribute for the selector was not found
 */
export function getData(element: HTMLElement, selector?: string, fallback?: any) {
	if (!isObject(element)) return undefined;
	
	// Auto convert json objects
	function getDataConverter(value: any) {
		if (isString(value)) {
			try {
				return JSON.parse(value);
			} catch (e) {
			}
		}
		return value;
	}
	
	// Load a single selector
	if (isString(selector)) {
		selector = "data-" + selector.trim().replace(/^data-/, "");
		if (!element.hasAttribute(selector)) return fallback;
		return getDataConverter(element.getAttribute(selector));
	}
	
	// Load all data values of element
	// Courtesy of https://stackoverflow.com/a/18540799
	var dataset = {};
	var attrs = element.attributes;
	for (var i = 0; i < attrs.length; i++) {
		var attr = attrs.item(i);
		// make sure it is a data attribute
		if (attr.nodeName.match(new RegExp(/^data-/))) {
			// remove the 'data-' from the string
			dataset[attr.nodeName.replace(new RegExp("^data-"), "")] =
				getDataConverter(attr.nodeValue);
		}
	}
	return dataset;
}