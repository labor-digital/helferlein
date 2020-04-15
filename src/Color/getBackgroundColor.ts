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
 * Last modified: 2019.08.01 at 18:23
 */

import {isBrowser} from "../Environment/isBrowser";
import {isNull} from "../Types/isNull";
import {isObject} from "../Types/isObject";
import {isUndefined} from "../Types/isUndefined";
import {RgbColor} from "./Color.interfaces";
import {rgbStringToRgbColor} from "./rgbStringToRgbColor";

/**
 * Traverses the dom upwards, beginning by the given element and extracts their background color.
 * If the background color is transparent it will be ignored and the search continues.
 * The traversing stops as soon as either the HTML node is reached or a background color was found.
 *
 * If a color was found, the rgb value will be returned, if no color was found
 * or it was completely transparent NULL is returned
 * @param el
 */
export function getBackgroundColor(el: HTMLElement): RgbColor | null {
	if (!isBrowser()) return null;
	if (!isObject(el)) return null;
	let backgroundColor = null;
	while (el) {
		const backgroundColorLocal = window.getComputedStyle(el).backgroundColor;
		if (backgroundColorLocal === null) break;
		const rgba = backgroundColorLocal.match(/^rgba?\((\d+|0),\s*(\d+|0),\s*(\d+|0)(?:,\s*(\d+|0))?\)$/);
		if (!isNull(rgba) && (isUndefined(rgba[4]) || rgba[4] !== "0"))
			backgroundColor = rgbStringToRgbColor(backgroundColorLocal);
		if (el.tagName === "HTML" || !isNull(backgroundColor)) break;
		el = el.parentElement;
	}
	if (isNull(backgroundColor)) return null;
	return backgroundColor;
}