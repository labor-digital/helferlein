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
 * Last modified: 2019.01.09 at 12:58
 */
import type {List, ReadList} from '../Interfaces/List';
import type {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from './forEach';
import {getListType, getNewList, setListValue} from './listAccess';

export interface MapCallback<V = any, K = number | string, R = any>
{
    /**
     * Is called for every element of the iterated object
     * @param value The current value
     * @param key The current key
     * @param iteratedObject The iterated object
     */
    (value: V, key: K, iteratedObject: ReadList<V, K>): R
}

export function map<R, V = any, K = number>(list: Array<V>, callback: MapCallback<V, K, R>): R[]
export function map<R, V = any, K = number>(list: Set<V>, callback: MapCallback<V, K, R>): Set<R>
export function map<R, V = any, K = any>(list: Map<K, V>, callback: MapCallback<V, K, R>): Map<K, R>
export function map<R, V = any, K = string>(list: PlainObject<V>, callback: MapCallback<V, K, R>): PlainObject<R>
export function map<R, V = any, K = number>(list: Iterator<V>, callback: MapCallback<V, K, R>): R[]

/**
 * Works like Array.map() but for any valid list object
 * @param list The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 */
export function map<V, K, R>(list: ReadList<V, K>, callback: MapCallback<V, K, R>): List<R, K>
{
    const output = getNewList<R, K>(getListType(list));
    forEach(list, (v, k) => {
        setListValue(output, callback(v, k, list), k);
    });
    return output;
}