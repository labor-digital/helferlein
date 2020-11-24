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
 * Last modified: 2019.01.09 at 14:51
 */

import {List} from '../Interfaces/List';
import {forEach, ForEachCallbackType} from './forEach';
import {isList} from './isList';
import {getListType, getNewList, setListValue} from './listAccess';

export interface FilterCallback extends ForEachCallbackType
{
}

/**
 * Works exactly the same as Array.filter() but with any valid list object
 * @param list
 * @param callback
 */
export function filter(list: List, callback: FilterCallback): any
{
    if (!isList(list)) {
        throw new Error('Could not determine the output type of a given element!');
    }
    
    const output = getNewList(getListType(list));
    forEach(list, (v, k) => {
        if (callback(v, k, list) !== false) {
            setListValue(output, v, k);
        }
    });
    
    return output;
}