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
 * Last modified: 2019.03.31 at 19:36
 */
import {isNumber} from "../Types/isNumber";

/**
 * Checks if the given element is visible inside the current viewport (any part of it)
 * @see https://stackoverflow.com/a/125106
 * @param el
 * @param offsetTop
 */
export function isElementInViewport(el: HTMLElement, offsetTop?:number): boolean {
	let top = el.offsetTop;
	let left = el.offsetLeft;
	const width = el.offsetWidth;
	const height = el.offsetHeight;
	
	while (el.offsetParent) {
		el = el.offsetParent as any;
		top += el.offsetTop;
		left += el.offsetLeft;
	}
	top += (isNumber(offsetTop) ? offsetTop : 0);
	return (
		top < (window.pageYOffset + window.innerHeight) &&
		left < (window.pageXOffset + window.innerWidth) &&
		(top + height) > (window.scrollY || window.pageYOffset || document.documentElement.scrollTop) &&
		(left + width) > (window.scrollX || window.pageXOffset || document.documentElement.scrollLeft)
	);
}