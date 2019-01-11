/**
 * Created by Martin Neundorfer on 11.01.2019.
 * For LABOR.digital
 */
import {forEach} from "../Lists/forEach";

/**
 * Removes a single, or multiple classes to the given html element
 * @param element
 * @param classes
 */
export function removeClass(element: HTMLElement, classes:string) {
	const classList = classes.split(" ");
	forEach(classList, c => {
		element.className = element.className.replace(new RegExp("(^|\\s)"+c+"(\\s|$)", "g"), "");
	});
}