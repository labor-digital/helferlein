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

import {forEach} from '../Lists/forEach';
import {isObject} from '../Types/isObject';
import {testFlags} from '../util';
import {hasClassList} from './util';

/**
 * Returns true if the given element has the given class name
 * @param element A single html element to check if it has a given class
 * @param classes The space-separated list of classes to remove from the element
 */
export function hasClass(element: HTMLElement, classes: string): boolean
{
    if (isObject(element)) {
        let state = true;
        let elClasses: Array<string>;
        classes = classes.trim();
        
        if (classes === '') {
            return false;
        }
        
        forEach(classes.split(' '), c => {
            if (c.trim() === '') {
                return;
            }
            
            if (hasClassList && !testFlags.noClassList) {
                if (!element.classList.contains(c)) {
                    state = false;
                    return false;
                }
            } else {
                elClasses = elClasses ?? classes.split(' ');
                if (elClasses.indexOf(c) === -1) {
                    state = false;
                    return false;
                }
            }
            
        });
        
        return state;
    }
    
    return false;
}
