/**
 * Created by Martin Neundorfer on 11.01.2019.
 * For LABOR.digital
 */
import {forEach} from "../Lists/forEach";

/**
 * Adds a single, or multiple classes to the given html element
 * @param element
 * @param classes
 */
export function addClass(element: HTMLElement, classes:string) {
	const classList = classes.split(" ");
	forEach(classList, c => {
		if(element.className.indexOf(c) === -1)
			element.className += " " + c;
	});
}