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
 * Last modified: 2019.06.12 at 12:08
 */

import {getListType, getListValue, isArray, isUndefined, List, ListPath, ListType} from '../..';
import {_initPathWalkerPath, _initPathWalkerStep} from './_internals';

/**
 * This method checks if a given path exists in a given $input array
 *
 * @param list The list to check
 * @param path The path to check for in $list
 * @param separator Default: "." Can be set to any string you want to use as separator of path parts.
 */
export function hasPath(list: List, path: ListPath, separator?: string): boolean
{
    // Check recursive if the path exists
    const walker = function hasPathWalker(list: List, path: Array<any>) {
        const [keys, isLastKey] = _initPathWalkerStep(list, path);
        for (let i = 0; i < keys.length; i++) {
            
            // Handle nested paths
            if (isArray(keys[i])) {
                walker(list, keys[i]);
                return;
            }
            
            // Validate if the requested value exists
            const value = getListValue(list, keys[i]);
            if (isUndefined(value)) {
                throw new Error();
            }
            
            // Follow the path deeper
            if (!isLastKey) {
                if (getListType(value) === ListType.NoList) {
                    throw new Error();
                }
                walker(value, path.slice(0));
            }
        }
    };
    
    try {
        walker(list, _initPathWalkerPath(list, path, separator));
        return true;
    } catch (e) {
        return false;
    }
}