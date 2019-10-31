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
 * Last modified: 2019.01.10 at 10:00
 */
import {isBrowser} from "../Environment/isBrowser";

declare global {
	interface HTMLElement {
		createTextRange?: Function;
	}
}

/**
 * Helper to select all text of a given element
 * (Like marking it with the mouse)
 *
 * The implementation is from https://stackoverflow.com/a/987376
 * But the author quotes https://www.codingforums.com/archive/index.php/t-105808.html
 *
 * @param element The dom element to mark the text of
 */
export function selectTextOfElement(element: HTMLElement) {
	if (!isBrowser()) return;
	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}