/**
 * Created by Martin Neundorfer on 10.01.2019.
 * For LABOR.digital
 */
import {isFunction} from "../Types/isFunction";

/**
 * Executes a given callback as soon as the document is ready
 * @param callback
 */
export function onReady(callback: Function) {
	// in case the document is already rendered
	if (document.readyState !== "loading") callback();
	else if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback as any);
	else if (isFunction((document as any).attachEvent)) (document as any).attachEvent("onreadystatechange", function () {
		if (document.readyState == "complete") callback();
	});
	else callback();
}