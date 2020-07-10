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
 * Last modified: 2019.05.07 at 18:19
 */

import {isObject} from '../Types/isObject';

/**
 * Returns the value of one attribute of the given element
 * @param element the element to read the attribute on
 * @param attributeName the name of the attribute to look up (e.g. class)
 * @param fallback Optional fallback to be returned when the attribute was not found
 */
export function getAttr(element: HTMLElement | Element, attributeName: string, fallback?: any)
{
    if (!isObject(element)) {
        return fallback;
    }
    if (!element.hasAttribute(attributeName)) {
        return fallback;
    }
    return element.getAttribute(attributeName);
}