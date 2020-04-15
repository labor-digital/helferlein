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
 * Last modified: 2019.02.18 at 13:52
 */

import {isObject} from "../Types/isObject";
import {addClass} from "./addClass";
import {removeClass} from "./removeClass";

/**
 * Toggles a single, or multiple classes to the given html element based on a given condition
 * @param element The element to toggle the class on
 * @param classes The class / classes to toggle
 * @param condition A condition to toggle the classes by
 */
export function toggleClass(element: HTMLElement | NodeListOf<Element>, classes: string, condition: boolean) {
	if (!isObject(element)) return;
	if (condition === true) addClass(element, classes);
	else removeClass(element, classes);
}