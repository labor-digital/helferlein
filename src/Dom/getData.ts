/**
 * Created by Martin Neundorfer on 14.01.2019.
 * For LABOR.digital
 */

import {isString} from "../Types/isString";
import {isObject} from "../Types/isObject";

/**
 * This helper receives a html element and extracts either a single,
 * or all data attributes from it. It can also accept a default, which
 * is returned if the given element has no data with the required selector
 *
 * @param element
 * @param selector
 * @param fallback
 */
export function getData(element: HTMLElement, selector?: string, fallback?: any) {
	if (!isObject(element)) return undefined;

	// Auto convert json objects
	function getDataConverter(value:any){
		if(isString(value)){
			try {
				return JSON.parse(value);
			} catch (e) {}
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