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
 * Last modified: 2019.02.01 at 17:38
 */
import {isUndefined} from "../Types/isUndefined";
import {getGuid} from "../Misc/getGuid";
import {getOffset} from "../Dom/getOffset";
import {throttleEvent} from "./throttleEvent";
import {addClass} from "../Dom/addClass";
import {removeClass} from "../Dom/removeClass";
import {isPlainObject} from "../Types/isPlainObject";
import {isNumber} from "../Types/isNumber";
import {isString} from "../Types/isString";
import {isBool} from "../Types/isBool";
import {getScrollPos} from "./getScrollPos";
import {forEach} from "../Lists/forEach";

let stickyElements = [];

export interface StickyElementOptions {
	/**
	 * The offset (in pixels)from the top of the page the element
	 * should stick to
	 * Default: 0
	 */
	offset?: number

	/**
	 * Can be used to disable the setting of the style attribute to fixed / top
	 * Default: true
	 */
	setStyle?: boolean

	/**
	 * Can be used to define the class which is applied to the element
	 * when it should be considered "sticky"
	 * Default: sticky
	 */
	class?: string
}

/**
 * Register our scroll event listener which is used to loop over all our
 * registered elements and calculate their sticky state
 */
window.addEventListener("scroll", throttleEvent(() => {
	if (stickyElements.length === 0) return;
	const scrollPos = getScrollPos();
	for (let i = 0; i < stickyElements.length; i++)
		checkElementState(stickyElements[i], scrollPos);
}, 10));

/**
 * This internal function receives one element's storage object
 * and the current scroll position and calculates if the sticky
 * state has changed / if it is required to update the dom
 * @param e
 * @param scrollPos
 */
function checkElementState(e, scrollPos) {
	if (isUndefined(e.position))
		e.position = Math.max(0, getOffset(e.element).top - e.options.offset);
	e.state = e.position <= scrollPos;
	if (e.state !== e.appliedState) {
		if (e.state) {
			// Make the element sticky
			addClass(e.element, e.options.class);
			if (e.options.setStyle) {
				e.element.style.position = "fixed";
				e.element.style.top = e.options.offset + "px"
			}
		} else {
			// Unstick the element
			removeClass(e.element, e.options.class);
			if (e.options.setStyle) {
				e.element.style.position = "";
				e.element.style.top = ""
			}
		}
		e.appliedState = e.state;
	}
}

/**
 * This helper can be used to make elements of your website sticky. Means they stick to the top of the page.
 * There is a css attribute which can do that "position: sticky" but it isn't currently supported by IE.
 * It also works best in an "position: relative" context.
 *
 * Yea, there are plugins out there that do that kind of stuff, but I don't see why I would add thounds of lines of code to do such a simple thing o.O
 *
 * By default it will check if the given element is below the upper, visible border of the viewport, if not it will add two inline styles: "position: fixed; top: 0" which should
 * do the trick for "position: absolute" elements. In addition to that it will set a css class "sticky" to the target element
 * which allows you to have a finer control about your sticky element.
 *
 * Offset, attributes and classname can be configured using the options.
 *
 * NOTE: Make sure to use destroyStickyElement() when you delete your dom element to prevent memory leaks!
 *
 * @param element
 * @param options
 */
export function stickyElement(element: HTMLElement, options?: StickyElementOptions) {
	// Check if element is already sticky
	if (!isUndefined((element as any)._stickyGuid)) {
		console.error("The given element is already sticky!");
		return;
	}

	// Prepare internal storage object
	const guid = (element as any)._stickyGuid = getGuid();
	if (!isPlainObject(options)) options = {};
	if (!isNumber(options.offset)) options.offset = 0;
	if (!isBool(options.setStyle)) options.setStyle = true;
	if (!isString(options.class)) options.class = "sticky";
	const e = {guid, element, options};
	stickyElements.push(e);

	// Check initial state -> so we don't have to wait for a scroll event
	checkElementState(e, getScrollPos());
}

/**
 * Receives a sticky html element and destroys it in our internal logic
 * and converts it back to its original state
 * @param element
 */
export function destroyStickyElement(element: HTMLElement) {
	// Ignore non-sticky elements
	if (isUndefined((element as any)._stickyGuid)) return;

	// Search the element which should be destroyed
	forEach(stickyElements, (e, k) => {
		if (e.guid === (element as any)._stickyGuid) {
			// Make sure the element was un-sticked
			e.state = true;
			checkElementState(e, -1);

			// Clean up
			stickyElements.splice(k, 1);
			delete (element as any)._stickyGuid;
			return false;
		}
	});
}