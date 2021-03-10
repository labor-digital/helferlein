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
 * Last modified: 2019.01.09 at 12:53
 */
import type {PlainObject} from './PlainObject';

export type List<V = any, K = any, T = Array<V> | Set<V> | Map<K, V> | PlainObject<V>> = T;
export type ReadList<V = any, K = any, T = List<V, K> | Iterable<V>> = T;

export type TListPathArray = Array<string | number | TListPathArray>;
export type ListPath = string | number | TListPathArray;

export enum ListType
{
    Array = 'array', Set = 'set', Map = 'map', Object = 'object', NoList = 'noList', Iterator = 'iterator'
}

export interface ListTypeDefinition
{
    array: (v: Array<any>) => any
    set: (v: Set<any>) => any
    map: (v: Map<any, any>) => any
    object: (v: Object) => any
    iterator: (v: Iterator<any>) => any
    noList?: () => any | never
}
