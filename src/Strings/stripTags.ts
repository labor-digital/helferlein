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
 * Last modified: 2019.01.24 at 10:40
 */
import {isFunction} from '../Types/isFunction';
import {isUndefined} from '../Types/isUndefined';

/**
 * This helper removes all html tags from a given string, returning only
 * the containing text
 * @param value
 */
export function stripTags(value: string): string
{
    if (isUndefined(document) || !isFunction(document.createElement)) {
        throw new Error('This stripTags implementation only works in browsers!');
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    return div.textContent || div.innerText || '';
}