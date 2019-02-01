/**
 * Created by Martin Neundorfer on 01.02.2019.
 * For LABOR.digital
 */
import {isUndefined} from "../Types/isUndefined";

/**
 * Returns the vertical scroll position of either the window,
 * or the given container object
 *
 * @param container
 */
export function getScrollPos(container?:HTMLElement|Window):number {
	if(isUndefined(container) || container === window)
		return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
	return (container as HTMLElement).scrollTop;
}