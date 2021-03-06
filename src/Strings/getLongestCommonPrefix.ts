/*
 * Copyright 2020 LABOR.digital
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
 * Last modified: 2020.07.10 at 12:12
 */

/**
 * Finds the longest common prefix in a list of strings
 * @param list A list of strings to fetch the prefix from
 * @source https://codereview.stackexchange.com/a/182245
 */
export function getLongestCommonPrefix(list: Array<string>): string
{
    if (!list) {
        return '';
    }
    
    let smallest = list.reduce((min, str) => min < str ? min : str, list[0]);
    let largest = list.reduce((min, str) => min > str ? min : str, list[0]);
    
    for (let i = 0; i < smallest.length; i++) {
        if (smallest[i] != largest[i]) {
            return smallest.substr(0, i);
        }
    }
    
    return '';
}