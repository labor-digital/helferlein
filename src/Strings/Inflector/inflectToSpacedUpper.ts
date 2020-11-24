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

import {inflectToArray, ucFirst} from '../..';

/**
 * Converts a "Given string" to "Given String" or
 * "another.String-you wouldWant" to "Another String You Would Want".
 *
 * @param string  The string to inflect
 * @param intelligentSplitting Uses intelligent splitting for edge cases if set to true. @see inflectToArray() for details.
 */
export function inflectToSpacedUpper(string: string, intelligentSplitting?: boolean): string
{
    return inflectToArray(string, intelligentSplitting).map(v => ucFirst(v)).join(' ');
}

/**
 * Alias of toSpacedUpper
 *
 * @param string  The string to inflect
 * @param intelligentSplitting Uses intelligent splitting for edge cases if set to true. @see inflectToArray() for details.
 *
 * @return string
 */
export function inflectToHuman(string: string, intelligentSplitting?: boolean): string
{
    return inflectToSpacedUpper(string, intelligentSplitting);
}