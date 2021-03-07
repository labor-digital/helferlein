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
 * Last modified: 2019.06.12 at 21:02
 */

import {asArray} from '../../FormatAndConvert/asArray';
import {List, ListPath, TListPathArray} from '../../Interfaces/List';
import {isArray} from '../../Types/isArray';
import {isEmpty} from '../../Types/isEmpty';
import {isUndefined} from '../../Types/isUndefined';
import {getListType, getListValue, ListType} from '../listAccess';
import {merge} from '../merge';
import {_initPathWalkerPath, _initPathWalkerStep, KeyTypes} from './_internals';

/**
 * Internal worker to do the actual iteration
 *
 * @param list
 * @param path
 * @param defaultValue
 * @param isNested
 */
function getPathWalker(list: List, path: TListPathArray, defaultValue?: any, isNested?: boolean)
{
    const [keys, isLastKey, keyType] = _initPathWalkerStep(list, path);
    
    if (isEmpty(list)) {
        return defaultValue;
    }
    
    let result = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        
        // Handle nested paths
        if (isArray(key)) {
            result = merge(result, getPathWalker(list, key, defaultValue, true));
            continue;
        }
        
        // Validate if the requested value exists
        const value = getListValue(list, key);
        if (isUndefined(value)) {
            result[key] = defaultValue;
            continue;
        }
        
        // Follow the path deeper
        if (!isLastKey) {
            if (getListType(value) === ListType.NoList) {
                result[key] = defaultValue;
                continue;
            }
            result[key] = getPathWalker(value, path.slice(0), defaultValue, isNested);
        } else {
            result[key] = value;
        }
    }
    
    // Skip post processing if nested
    if (isNested === true) {
        return result;
    }
    
    // Flatten result
    if (keyType === KeyTypes.Default) {
        result = result[keys[0]];
    } else if (keyType === KeyTypes.Wildcard && keys[0] === 0) {
        result = asArray(result);
    }
    
    return result;
}

/**
 * This method reads a single value or multiple values (depending on the given $path) from
 * the given list. You may use wildcards by specifying an astrix(*) as the replacement for a generic key,
 * which will iterate over all, possible keys in the given list. You may also specify a subset of keys to return,
 * by using braces like [key1,key2]
 *
 * @param list The list to read the paths values from
 * @param path The path to read in the $input array
 * @param defaultValue The value which will be returned if the $path did not match anything.
 * @param separator Default: "." Can be set to any string you want to use as separator of path parts.
 */
export function getPath<V = any>(list: List<V>, path: ListPath, defaultValue?: any, separator?: string): V
{
    return getPathWalker(list, _initPathWalkerPath(list, path, separator), defaultValue);
}