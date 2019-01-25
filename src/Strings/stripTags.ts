/**
 * Created by Martin Neundorfer on 24.01.2019.
 * For LABOR.digital
 */
import {isUndefined} from "../Types/isUndefined";
import {isFunction} from "../Types/isFunction";

/**
 * This helper removes all html tags from a given string, returning only
 * the containing text
 * @param value
 */
export function stripTags(value: string): string {
	if (isUndefined(document) || !isFunction(document.createElement))
		throw new Error("This stripTags implementation only works in browsers!");
	const div = document.createElement("div");
	div.innerHTML = value;
	return div.textContent || div.innerText || "";
}