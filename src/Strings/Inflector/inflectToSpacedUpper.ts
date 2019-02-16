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
 * Last modified: 2019.02.15 at 20:21
 */

import {ucFirst} from "../ucFirst";
import {inflectToArray, InflectToArrayOptionsType} from "./inflectToArray";

/**
 * Converts a "Given string" to "Given String" or
 * "another.String-you wouldWant" to "Another String You Would Want".
 *
 * @param string  The string to inflect
 * @param options A configuration array to deactivate specific split settings. @see toArray() for details.
 */
export function inflectToSpacedUpper(string: string, options?: InflectToArrayOptionsType): string {
	return inflectToArray(string, options).map(v => ucFirst(v)).join(" ");
}

/**
 * Alias of toSpacedUpper
 *
 * @param string  The string to inflect
 * @param options A configuration array to deactivate specific split settings. @see toArray() for details.
 *
 * @return string
 */
export function inflectToHuman(string:string, options?:InflectToArrayOptionsType): string {
	return inflectToSpacedUpper(string, options);
}