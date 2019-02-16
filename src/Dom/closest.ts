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
 * Last modified: 2019.01.11 at 19:43
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
			const matches = isFunction(el.matches) ? el.matches : (el as any).msMatchesSelector.bind(el);
			if (matches(selector)) return el;
			el = el.parentElement;
		}
		return null;
	} else {
		return to.closest(selector) as HTMLElement | null;
	}
}