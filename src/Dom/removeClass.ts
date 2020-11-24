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

import {forEach, isObject, isUndefined} from '..';

/**
 * Internal helper to avoid unnecessary iteration
 * @param element
 * @param regex
 */
function removeClassRemover(element: HTMLElement | Element, regex: RegExp)
{
    element.className = element.className.replace(regex, '$1 ').trim();
}

/**
 * Removes a single, or multiple classes to the given html element
 * @param element Receives either a single element or multiple elements
 * @param classes The space-separated list of classes to remove from the element
 */
export function removeClass(element: HTMLElement | NodeListOf<Element>, classes: string)
{
    if (!isObject(element)) {
        return;
    }
    // Prepare regex
    const pattern = '(^|\\s)' + classes.replace(/\*/g, '[^\\s]*?').split(' ').join('(\\s|$)|') + '(\\s|$)';
    const regex = new RegExp(pattern, 'g');
    if (isUndefined((element as NodeListOf<Element>).length)) {
        return removeClassRemover(element as HTMLElement, regex);
    }
    forEach(element, (e) => removeClassRemover(e, regex));
}