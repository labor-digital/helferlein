/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
 */
import {isUndefined} from "../Types/isUndefined";

/**
 * Returns the offset of a given dom element relative to the document
 * @param element The element to get the offset of
 * @param container An optional container that is used as scroll target instead of the window
 */
export function getOffset(element: HTMLElement, container?:HTMLElement) {
	const rect = element.getBoundingClientRect();
	let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if(!isUndefined(container)){
		const containerRect = container.getBoundingClientRect();
		scrollLeft = container.scrollLeft - containerRect.left;
		scrollTop = container.scrollTop - containerRect.top;
	}
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	}
}