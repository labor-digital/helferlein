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
 * Last modified: 2019.02.01 at 10:50
 */

/**
 * Removes a single, or multiple classes to the given html element
 * @param element
 * @param classes
 */
export function removeClass(element: HTMLElement, classes: string) {
	const classList = classes.split(" ");
	for (let i = 0; i < classList.length; i++) {
		element.className = element.className
			.replace(new RegExp("(^|\\s)" + classList[i] + "(\\s|$)", "g"), "$1").trim();
	}
}