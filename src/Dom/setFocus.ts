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
 * Last modified: 2020.11.24 at 02:08
 */

import {asArray, filter, isBrowser, isFunction, isObject} from '..';

/**
 * Helper to set the focus of another html element relative to the given pivot element
 * @param pivot
 * @param offset
 */
function switchFocus(pivot: HTMLElement, offset: number): HTMLElement
{
    if (!isBrowser() || !isObject(pivot)) {
        return pivot;
    }
    
    let elements: any = document.querySelectorAll('input, button, select, textarea, a[href]');
    elements = filter(asArray(elements), (e) => e.tabIndex >= 0) as Array<HTMLElement>;
    const index = elements.indexOf(pivot);
    
    return focusElement(elements[index + offset] || elements[0]);
}

/**
 * Sets the focus on a given html element if possible
 * @param target
 */
export function focusElement(target: HTMLElement): HTMLElement
{
    if (isObject(target) && isFunction(target.focus)) {
        target.focus();
    }
    return target;
}

/**
 * Sets the focus on the next html element relative to the given pivot element if possible
 * @param pivot
 */
export function focusNextElement(pivot: HTMLElement): HTMLElement
{
    return switchFocus(pivot, 1);
}

/**
 * Sets the focus on the previous html element relative to the given pivot element if possible
 * @param pivot
 */
export function focusPreviousElement(pivot: HTMLElement): HTMLElement
{
    return switchFocus(pivot, -1);
}