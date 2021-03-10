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

import {forEach} from '../Lists/forEach';
import {isBool} from '../Types/isBool';
import {isNumber} from '../Types/isNumber';
import {isObject} from '../Types/isObject';
import {isString} from '../Types/isString';
import {isUndefined} from '../Types/isUndefined';

/**
 * Internal helper
 *
 * @param element
 * @param attributeName
 * @param value
 */
function setAttrSetter(element: HTMLElement | Element, attributeName: string, value: string | null)
{
    if (value === null) {
        element.removeAttribute(attributeName);
    } else {
        element.setAttribute(attributeName, value);
    }
}

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
)
{
    if (!isObject(element)) {
        return;
    }
    
    let valueString: string = '';
    
    if (isString(value)) {
        valueString = value as string;
    } else if (isBool(value)) {
        valueString = value ? 'TRUE' : 'FALSE';
    } else if (isNumber(value)) {
        valueString = value + '';
    } else if (value !== null && !isUndefined(value)) {
        valueString = JSON.stringify(value);
    }
    
    if (isUndefined((element as NodeListOf<Element>).length)) {
        setAttrSetter(element as HTMLElement, attributeName, valueString);
    } else {
        forEach(element, (e) => setAttrSetter(e, attributeName, valueString));
    }
}