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
 * Last modified: 2019.01.10 at 10:18
 */
import {asArray} from '../FormatAndConvert/asArray';
import {List, ListType, ListTypeDefinition, ReadList} from '../Interfaces/List';
import {isArray} from '../Types/isArray';
import {isIterator} from '../Types/isIterator';
import {isMap} from '../Types/isMap';
import {isNullOrUndef} from '../Types/isNullOrUndef';
import {isObject} from '../Types/isObject';
import {isSet} from '../Types/isSet';
import {forEach} from './forEach';

// @deprecated import listType directly from interfaces
export {ListType};

/**
 * Returns an enum of ListType which defines the type of list that was given
 * @param element
 */
export function getListType(element: any): ListType
{
    if (!isNullOrUndef(element)) {
        if (isArray(element)) {
            return ListType.Array;
        } else if (isSet(element)) {
            return ListType.Set;
        } else if (isMap(element)) {
            return ListType.Map;
        } else if (isIterator(element)) {
            return ListType.Iterator;
        } else if (isObject(element)) {
            return ListType.Object;
        }
    }
    return ListType.NoList;
}

/**
 * Helper to call different actions based on the given list type
 * @param list
 * @param type
 * @param definition
 */
export function listTypeSwitch<V, K>(list: ReadList<V, K>, definition: ListTypeDefinition, type?: ListType): any
{
    type = type ?? getListType(list);
    if (!definition || !definition[type]) {
        if (type === ListType.NoList && !definition[ListType.NoList]) {
            throw new Error('Invalid list type given!');
        }
        return undefined;
    }
    return definition[type](list as any);
}

/**
 * Returns a new list object based on the given list type
 * @param type
 */
export function getNewList<V, K>(type: ListType): List<V, K>
{
    return listTypeSwitch({}, {
        array: () => [],
        set: () => new Set(),
        iterator: () => [],
        map: () => new Map(),
        object: (v) => v
    }, type);
}

/**
 * Returns the value of a given list at a given key
 * @param list
 * @param key
 */
export function getListValue<V, K>(list: ReadList<V, K>, key: K): undefined | V
{
    const setAndIteratorHandler = () => {
        let out = undefined;
        forEach(list, (v, k) => {
            if (k !== key) {
                return;
            }
            out = v;
            return false;
        });
        return out;
    };
    
    return listTypeSwitch(list, {
        array: (v) => v[key as any],
        set: () => setAndIteratorHandler(),
        iterator: () => setAndIteratorHandler(),
        map: (v) => v.get(key),
        object: (v) => v[key + '']
    });
}

/**
 * Sets a value for a given key in the given list.
 *
 * @param list
 * @param key
 * @param value
 */
export function setListValue<V, K>(list: List<V, K>, value: V, key?: K): void
{
    const keyCheck = () => {
        if (isNullOrUndef(key)) {
            throw new Error('The given list type requires a "key" value to be specified!');
        }
    };
    return listTypeSwitch(list, {
        array: (v) => v.push(value),
        set: (v) => v.add(value),
        iterator: () => {
            throw new Error('Can\'t set the value of an iterator!');
        },
        map: (v) => {
            keyCheck();
            v.set(key, value);
        },
        object: (v) => {
            keyCheck();
            v[key + ''] = value;
        }
    });
}

/**
 * Returns the list of all keys of the given list element
 * @param list
 */
export function getListKeys<K>(list: ReadList<any, K>): Array<K>
{
    return asArray(listTypeSwitch(list, {
        array: (v) => v.keys(),
        set: (v) => [...Array(v.size)].keys(),
        iterator: (v) => asArray(v).keys(),
        map: (v) => v.keys(),
        object: (v) => Object.keys(v)
    }));
}

export function getNthInList<V, K>(list: ReadList<V, K>, index: number, returnKey?: true): K
export function getNthInList<V, K>(list: ReadList<V, K>, index: number, returnKey?: false | boolean): V

/**
 * Returns the nth element in a given list
 *
 * @param list The list to extact the element from
 * @param index The numeric index to extract from the list
 * @param returnKey True to return the key instead of the value
 */
export function getNthInList<V, K>(list: ReadList<V, K>, index: number, returnKey?: boolean): any
{
    let c = 0;
    const findLast = index === -1;
    let out = undefined;
    forEach(list, (v, k) => {
        if (c++ === index || findLast) {
            out = returnKey ? k : v;
            return findLast;
        }
    });
    return out;
}

export function getFirstInList<V, K>(list: ReadList<V, K>, returnKey?: true): K;
export function getFirstInList<V, K>(list: ReadList<V, K>, returnKey?: false | boolean): V;

/**
 * Returns the first element in a list
 *
 * @param list The list to extact the element from
 * @param returnKey True to return the key instead of the value
 */
export function getFirstInList<V, K>(list: ReadList<V, K>, returnKey?: boolean): any
{
    return getNthInList(list, 0, returnKey);
}

export function getLastInList<V, K>(list: ReadList<V, K>, returnKey?: true): K;
export function getLastInList<V, K>(list: ReadList<V, K>, returnKey?: false | boolean): V;

/**
 * Returns the last element in a list
 *
 * @param list The list to extact the element from
 * @param returnKey True to return the key instead of the value
 */
export function getLastInList<V, K>(list: ReadList<V, K>, returnKey?: boolean): any
{
    return getNthInList(list, -1, returnKey);
}

/**
 * Returns the length of the given list
 * @param list
 * @param returnKey
 */
export function getListSize<V, K>(list: ReadList<V, K>, returnKey?: boolean): number
{
    return listTypeSwitch(list, {
        array: (v) => v.length,
        set: (v) => v.size,
        iterator: (v) => asArray(v).length,
        map: (v) => v.size,
        object: (v) => Object.keys(v).length
    });
}

/**
 * Returns the intersection of two lists
 * @param a
 * @param b
 */
export function listIntersect<V1 = any, K1 = any, V2 = any, K2 = any>(
    a: ReadList<V1, K1>,
    b: ReadList<V2, K2>
): Array<V1 | V2>
{
    const known = [];
    const _b = asArray(b);
    return asArray(a).filter(v => {
        const r = _b.indexOf(v) !== -1 && known.indexOf(v) === -1;
        known.push(v);
        return r;
    });
}