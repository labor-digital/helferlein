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
 * Last modified: 2019.11.10 at 20:39
 */

import {List} from '../Interfaces/List';
import {forEach} from './forEach';
import {getListType, getNewList, setListValue} from './listAccess';

/**
 * Similar to PHP's array_chunks method this method will take any kind of list of chunks that are
 * not longer than the given "length".
 *
 * @param list The list to split into chunks
 * @param length The maximum number of items to put into a single chunk
 */
export function chunks(list: List, length: number): Array<List>
{
    const result = [];
    const listType = getListType(list);
    let chunk = getNewList(listType);
    let count = 0;
    
    forEach(list, (v, k) => {
        setListValue(chunk, v, k);
        if (++count === length) {
            result.push(chunk);
            chunk = getNewList(listType);
            count = 0;
        }
    });
    
    if (count > 0) {
        result.push(chunk);
    }
    return result;
}