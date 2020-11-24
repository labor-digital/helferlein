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
 * Last modified: 2019.06.12 at 17:51
 */

import {List, ListPath} from '../../Interfaces/List';
import {isArray} from '../../Types/isArray';
import {isUndefined} from '../../Types/isUndefined';
import {getListKeys, getListType, ListType} from '../listAccess';
import {parsePath} from './parsePath';

const CONTROL_OBJECT_ESCAPING = {
    '\\*': '*',
    '\*': '*'
};

export enum KeyTypes
{
    Default, Wildcard, Keys
}


/**
 * Internal helper to generate the correct key list for the current walker step
 *
 * @param list
 * @param path
 * @private
 */
export function _initPathWalkerStep(list: List, path: Array<string>): Array<any>
{
    // Prepare result
    const part = path.shift();
    let keys = [];
    let keyType = KeyTypes.Default;
    let isLastKey = path.length === 0;
    
    // Handle incoming array -> Subkeys
    if (isArray(part)) {
        keyType = KeyTypes.Keys;
        keys = part as any;
    } else {
        let key = '' + part;
        let keyEscaped = key;
        
        // Handle control object escaping
        if (!isUndefined(CONTROL_OBJECT_ESCAPING[keyEscaped])) {
            key = CONTROL_OBJECT_ESCAPING[keyEscaped];
        }
        
        // Get the type of the current key
        if (keyEscaped === '*') {
            // WILDCARD
            keys = getListKeys(list);
            keyType = KeyTypes.Wildcard;
        } else {
            keys = [key];
        }
    }
    
    return [keys, isLastKey, keyType];
}

export function _initPathWalkerPath(list: List, path: ListPath, separator): Array<string | Array<any>>
{
    if (isUndefined(separator)) {
        separator = '.';
    }
    if (getListType(list) === ListType.NoList) {
        throw new Error('The given value can not be accessed via path');
    }
    const parsedPath = parsePath(path, separator);
    if (parsedPath.length === 0) {
        throw new Error('The given path is empty!');
    }
    return parsedPath;
}