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
 * Last modified: 2019.06.14 at 17:09
 */

import {isObject} from '..';

/**
 * Returns true if the given element has the given class name
 * @param element A single html element to check if it has a given class
 * @param className A single class to check for existence
 */
export function hasClass(element: HTMLElement, className: string): boolean
{
    if (!isObject(element)) {
        return false;
    }
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className.trim() + ' ') > -1;
}
