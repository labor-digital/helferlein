/**
 * Created by Martin Neundorfer on 11.01.2019.
 * For LABOR.digital
 */

/**
 * Adds a single, or multiple classes to the given html element
 * @param element
 * @param classes
 */
export function addClass(element: HTMLElement, classes: string) {
	const classList = classes.split(" ");
	for (let i = 0; i < classList.length; i++) {
		if (element.className.indexOf(classList[i]) === -1)
			element.className += " " + classList[i];
	}
}