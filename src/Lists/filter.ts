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

import {List, ReadList} from '../Interfaces/List';
import {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from './forEach';
import {getListType, getNewList, setListValue} from './listAccess';
import {MapCallback} from './map';

export interface FilterCallback<V = any, K = any>
{
    /**
     * Is called for every element of the iterated object
     * @param value The current value
     * @param key The current key
     * @param iteratedObject The iterated object
     */
    (value?: V, key?: K, iteratedObject?: ReadList<V, K>): boolean
}

export function filter<V, K = number>(list: Array<V>, callback: MapCallback<V, K>): V[]
export function filter<V, K = number>(list: Set<V>, callback: MapCallback<V, K>): Set<V>
export function filter<V, K = any>(list: Map<K, V>, callback: MapCallback<V, K>): Map<K, V>
export function filter<V, K = string>(list: PlainObject<V>, callback: MapCallback<V, K>): PlainObject<V>
export function filter<V, K = number>(list: Iterator<V>, callback: MapCallback<V, K>): V[]

/**
 * Works exactly the same as Array.filter() but for any valid list object
 * @param list
 * @param callback
 */
export function filter<V, K>(list: ReadList<V, K>, callback: FilterCallback<V, K>): List<V, K>
{
    const output = getNewList<V, K>(getListType(list));
    forEach(list, (v, k) => {
        if (callback(v, k, list) !== false) {
            setListValue(output, v, k);
        }
    });
    return output;
}