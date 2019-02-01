/**
 * Created by Martin Neundorfer on 11.01.2019.
 * For LABOR.digital
 */

/**
 * Removes a single, or multiple classes to the given html element
 * @param element
 * @param classes
 */
export function removeClass(element: HTMLElement, classes: string) {
	const classList = classes.split(" ");
	for (let i = 0; i < classList.length; i++) {
		element.className = element.className
			.replace(new RegExp("(^|\\s)" + classList[i] + "(\\s|$)", "g"), "$1").trim();
	}
}