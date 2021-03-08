/*
 * Copyright 2021 LABOR.digital
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
 * Last modified: 2021.03.07 at 23:11
 */

import {List, ListPath, TListPathArray} from '../../Interfaces/List';
import {isArray} from '../../Types/isArray';
import {isList} from '../isList';
import {getListValue, setListValue} from '../listAccess';
import {_initPathWalkerPath, _initPathWalkerStep} from './_internals';

/**
 * Internal worker to do the actual iteration
 *
 * @param list
 * @param path
 * @param value
 */
function setPathWalker(list: List, path: TListPathArray, value: any): void
{
    const [keys, isLastKey] = _initPathWalkerStep(list, path);
    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        
        if (isArray(key)) {
            setPathWalker(list, key, value);
            continue;
        }
        
        if (isLastKey) {
            setListValue(list, value, key);
            continue;
        }
        
        let children = getListValue(list, key);
        if (!isList(children)) {
            children = {};
            setListValue(list, children, key);
        }
        
        setPathWalker(children, path, value);
    }
}

/**
 * This function lets you set a given value at a path of your array.
 * You can also set multiple keys to the same value at once if you use wildcards.
 *
 * You may use wildcards by specifying an astrix(*) as the replacement for a generic key,
 * which will iterate over all, possible keys in the given list. You may also specify a subset of keys to return,
 * by using braces like [key1,key2]
 *
 * NOTE: The list is directly edited! If you want immutable behaviour, clone the list first!
 *
 * @param list The list to set the value to
 * @param path The path to set $value at
 * @param value The value to set at $path in $input
 * @param separator Default: "." Can be set to any string you want to use as separator of path parts.
 */
export function setPath<V = any>(list: List<V>, path: ListPath, value: any, separator?: string): List<V>
{
    setPathWalker(list, _initPathWalkerPath(list, path, separator), value);
    return list;
}