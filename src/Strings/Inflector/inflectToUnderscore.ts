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
 * Last modified: 2019.02.17 at 17:24
 */
import {inflectToArray} from "./inflectToArray";

/**
 * Converts a "Given string" to "given_string" or
 * "another.String-you wouldWant" to "another_string_you_would_want".
 *
 * @param string  The string to inflect
 * @param intelligentSplitting Uses intelligent splitting for edge cases if set to true. @see inflectToArray() for details.
 */
export function inflectToUnderscore(string: string, intelligentSplitting?: boolean): string {
	return inflectToArray(string, intelligentSplitting).join("_");
}
