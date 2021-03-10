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
 * Last modified: 2019.12.30 at 21:08
 */

import clone from 'clone';
import type {List} from '../Interfaces/List';

export interface CloneListOptionsInterface
{
    /**
     * Defaults to true. Call clone with circular set to false if you are certain that obj contains no circular
     * references. This will give better performance if needed. There is no error if undefined or null is passed as
     */
    circular?: boolean
    
    /**
     * Depth to which the object is to be cloned (optional, defaults to Infinity)
     */
    depth?: number
    
    /**
     * Sets the prototype to be used when cloning an Object. (optional, defaults to __proto__ of the to be cloned value, ie.
     * the cloned object will have the same prototype as the original).
     */
    prototype?: any
    
    /**
     * Set to true if the non-enumerable properties should be cloned as well. Non-enumerable properties on the prototype
     * chain will be ignored. (optional, defaults to false)
     */
    includeNonEnumerable?: boolean
}

/**
 * A typescript wrapper for the clone package
 * @param list The list to be cloned
 * @param options Additional options for the internal clone package
 * @see https://github.com/pvorb/clone
 */
export function cloneList<T = List>(list: T, options?: CloneListOptionsInterface): T
{
    return clone(list, options ?? {});
}
