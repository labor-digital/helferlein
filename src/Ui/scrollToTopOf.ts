/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import {merge} from "../Lists/merge";
import {scrollToPosition} from "./scrollToPosition";
import {isNumber} from "../Types/isNumber";
import {isUndefined} from "../Types/isUndefined";
import {isObject} from "../Types/isObject";
import {PlainObject} from "../Interfaces/PlainObject";
import {getOffset} from "../Dom/getOffset";
import {isEmpty} from "../Types/isEmpty";

interface ScrollToTopOfConfiguration extends PlainObject {
	/**
	 * The speed in milliseconds the scroll operation should take
	 */
	duration?: number;

	/**
	 * The offset to the top of the page when scrolling up
	 */
	offset?: number;

	/**
	 * If set this will be used as as scroll container instead of the "window"
	 */
	container?: HTMLElement | Window;
}

let config: ScrollToTopOfConfiguration = {
	duration: 300,
	offset: 0,
	container: window
};

/**
 * Helper to define the default configuration for the scroll methods
 * @param {{}} configuration
 *            Should receive an object with the following options:
 *            - duration: (Default 300) The speed in milliseconds the scroll operation should take
 *            - offset: (Default 0) The offset to the top of the page when scrolling up
 *            - container: (Default null) The container to scroll instead of the window
 */
export function configureScrollToTopOf(configuration: ScrollToTopOfConfiguration) {
	config = merge(config, configuration) as ScrollToTopOfConfiguration;
}

/**
 * Scrolls either the whole page or a specific element with the data attribute "data-scroll-target"
 * to the top of the element which is given as $o.
 *
 * @param target The object to which we should scroll
 * @param options Additional options for this scroll operation
 *            - duration: (Default 300) The duration in milliseconds the scroll operation should take
 *            - offset: (Default 0) The offset to the top of the page when scrolling up
 *            - container: (Default null) The container to scroll instead of the window
 */

export function scrollToTopOf(target?: HTMLElement, options?: ScrollToTopOfConfiguration) {

	// Check if we should scroll up to 0
	if (isEmpty(target)) return scrollToPosition(0);

	// Prepare options
	if (isUndefined(options)) options = {};
	if (!isNumber(options.duration)) options.duration = config.duration;
	if (!isNumber(options.offset)) options.offset = config.offset;
	if (!isObject(options.container)) options.container = config.container;

	// Scroll there
	const offset = getOffset(target, (options.container !== window ? options.container as HTMLElement : undefined));
	const position = Math.max(0, offset.top - options.offset);
	return scrollToPosition(position, options.duration, options.container);
}