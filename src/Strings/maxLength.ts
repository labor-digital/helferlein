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
 * Last modified: 2019.01.24 at 10:47
 */
import {forEach} from '../Lists/forEach';
import {isString} from '../Types/isString';

/**
 * This helper is used to cut a string to a fixed number of characters.
 * The resulting string will not exceed the given limit but will also respect
 * word boundraries, not cutting words in half.
 *
 * By default ellipsis will be added at the end of a string which was cut. To
 * disable this, set the third parameter to be an empty string
 *
 * @param value The value to limit to a given number of characters
 * @param limit The number of characters
 * @param ellipsis Optional: Used to override the ... added to a cut of string
 */
export function maxLength(value: string, limit: number, ellipsis?: string): string
{
    if (!isString(ellipsis)) {
        ellipsis = '...';
    }
    const words = value.trim().split(' ');
    let length = 0;
    let result: Array<string> = [];
    
    forEach(words, word => {
        if ((length += word.length) >= limit) {
            return false;
        }
        result.push(word);
    });
    
    let string = result.join(' ');
    
    if (words.length !== result.length) {
        string += ellipsis;
    }
    
    return string;
}