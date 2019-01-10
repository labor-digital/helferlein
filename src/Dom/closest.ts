/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
 */
import {isFunction} from "../Types/isFunction";

/**
 * A polifill for "closest()" element in internet explorer without jquery:
 * https://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery
 *
 * @param selector The selector to find
 * @param to The element to use as starting point
 */
export function closest(selector: string, to: HTMLElement): HTMLElement | null {
	if (!isFunction(to.closest)) {
		let el = to;
		while (el) {
			const matches = isFunction(el.matches) ? el.matches : el.msMatchesSelector.bind(el);
			if (matches(selector)) return el;
			el = el.parentElement;
		}
		return null;
	} else {
		return to.closest(selector) as HTMLElement | null;
	}
}