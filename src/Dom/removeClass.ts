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

import {filter} from '../Lists/filter';
import {forEach} from '../Lists/forEach';
import {isObject} from '../Types/isObject';
import {isUndefined} from '../Types/isUndefined';
import {testFlags} from '../util';
import {hasClassList} from './util';

/**
 * Internal helper to avoid unnecessary iteration
 * @param element
 * @param classList
 */
function remover(element: HTMLElement | Element, classList: Array<string>)
{
    if (hasClassList && !testFlags.noClassList) {
        // IE 11 supports class list, but does not support adding multiple classes at once
        forEach(classList, function (c) {c && element.classList.remove(c);});
    } else {
        // Fallback for browsers that don't support classList
        element.className = filter(
            element.className.split(' '),
            function (token): boolean {
                return token.trim() !== '' && classList.indexOf(token) === -1;
            }
        ).join(' ');
    }
}

/**
 * Removes a single, or multiple classes to the given html element
 * @param element Receives either a single element or multiple elements
 * @param classes The space-separated list of classes to remove from the element
 */
export function removeClass(element: HTMLElement | NodeListOf<Element>, classes: string)
{
    if (isObject(element)) {
        
        const classList = classes.split(' ');
        
        forEach(
            isUndefined((element as NodeListOf<Element>).length) ? [element] as any : element,
            function (e) {remover(e, classList);}
        );
        
    }
}