/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.02.01 at 15:10
 */
import {getOffset} from "../Dom/getOffset";
import {isBrowser} from "../Environment/isBrowser";
import {PlainObject} from "../Interfaces/PlainObject";
import {merge} from "../Lists/merge";
import {isEmpty} from "../Types/isEmpty";
import {isNumber} from "../Types/isNumber";
import {isObject} from "../Types/isObject";
import {isString} from "../Types/isString";
import {isUndefined} from "../Types/isUndefined";
import {scrollToPosition} from "./scrollToPosition";

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
	 * Can be a valid selector for document.querySelector() as a string, as well.
	 */
	container?: HTMLElement | Window | string;
}

const isInBrowser = isBrowser();

let config: ScrollToTopOfConfiguration = {
	duration: 300,
	offset: 0,
	container: isInBrowser ? window : null
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

export function scrollToTopOf(target?: HTMLElement | null, options?: ScrollToTopOfConfiguration) {
	// Noop if not in browser
	if (!isBrowser()) return;
	
	// Prepare options
	if (isUndefined(options)) options = {};
	if (!isNumber(options.duration)) options.duration = config.duration;
	if (!isNumber(options.offset)) options.offset = config.offset;
	if (!isObject(options.container) && !isString(options.container)) options.container = config.container;
	if (isEmpty(options.container)) options.container = window;
	
	// Get the element's offset
	const offset =
		isEmpty(target) ? {top: 0} :
			getOffset(target, (options.container !== window ? options.container as HTMLElement : undefined));
	
	// Scroll there
	const position = Math.max(0, offset.top - options.offset);
	return scrollToPosition(position, options.duration, options.container);
}