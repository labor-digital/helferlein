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
 * Last modified: 2019.01.10 at 10:28
 */

import {isEmpty} from "../Types/isEmpty";
import {isObject} from "../Types/isObject";

/**
 * Returns the offset of a given dom element relative to the document
 * @param element The element to get the offset of
 * @param container An optional container that is used as scroll target instead of the window
 */
export function getOffset(element: HTMLElement, container?: HTMLElement): { top: number, left: number } {
	if (!isObject(element)) return {top: 0, left: 0};
	const rect = element.getBoundingClientRect();
	let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if (!isEmpty(container)) {
		const containerRect = container.getBoundingClientRect();
		scrollLeft = container.scrollLeft - containerRect.left;
		scrollTop = container.scrollTop - containerRect.top;
	}
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}