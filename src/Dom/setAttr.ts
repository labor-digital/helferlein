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
 * Last modified: 2019.05.07 at 18:22
 */

import type {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from '../Lists/forEach';
import {isBool} from '../Types/isBool';
import {isNumber} from '../Types/isNumber';
import {isPlainObject} from '../Types/isPlainObject';
import {isString} from '../Types/isString';
import {isUndefined} from '../Types/isUndefined';

/**
 * Routes either a single element or a node list of elements to the attrWriter
 * @param element
 * @param attributeName
 * @param value
 */
function attrSetSingle(
    element: HTMLElement | Element | NodeListOf<Element>,
    attributeName: string,
    value: string | number | boolean | null
): void
{
    if (element instanceof Element) {
        attrWriter(element as HTMLElement, attributeName, value);
    } else {
        forEach(element, (e) => attrWriter(e, attributeName, value));
    }
}

/**
 * Handles the adding and removal of a single attribute on a given element
 * @param element
 * @param attributeName
 * @param value
 */
function attrWriter(
    element: HTMLElement | Element,
    attributeName: string,
    value: string | number | boolean | null
): void
{
    if (!attributeName || !(element instanceof HTMLElement)) {
        return;
    }
    
    if (value === null) {
        element.removeAttribute(attributeName);
    } else {
        element.setAttribute(attributeName, attrSerializer(value));
    }
}

/**
 * Helper to convert a given value into a string
 * @param value
 */
function attrSerializer(value: string | number | boolean | null): string
{
    if (isString(value)) {
        return value as string;
    }
    
    if (isBool(value)) {
        return value ? 'true' : 'false';
    }
    
    if (isNumber(value)) {
        return value + '';
    }
    
    if (value !== null && !isUndefined(value)) {
        return JSON.stringify(value);
    }
    
    return value + '';
}


/**
 * Sets / removes a given attribute from the list of given elements
 * @param element the element / elements to set or remove the attribute for
 * @param attributes An object where key is the name of the attribute and value is the value to set
 */
export function setAttr(
    element: HTMLElement | Element | NodeListOf<Element>,
    attributes: PlainObject<string | number | boolean | null>
): void

/**
 * Sets / removes a given attribute from the list of given elements
 * @param element the element / elements to set or remove the attribute for
 * @param attributeName The attribute to set / remove
 * @param value If null is given the attribute will be removed, otherwise the attribute will be set to this value
 */
export function setAttr(
    element: HTMLElement | Element | NodeListOf<Element>,
    attributeName: string,
    value: string | number | boolean | null
): void

/**
 * Sets / removes a given attribute from the list of given elements
 * @param element the element / elements to set or remove the attribute for
 * @param a
 * @param b
 */
export function setAttr(
    element: HTMLElement | Element | NodeListOf<Element>,
    a: string | PlainObject<string | number | boolean | null>,
    b?: string | number | boolean | null
): void
{
    if (!element) {
        return;
    }
    
    if (isPlainObject(a)) {
        forEach(a, (v, k) => attrSetSingle(element, k, v));
    } else {
        attrSetSingle(element, a, b ?? null);
    }
}