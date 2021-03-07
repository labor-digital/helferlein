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
 * Last modified: 2019.06.12 at 11:06
 */

import {ListPath, TListPathArray} from '../../Interfaces/List';
import {escapeRegex} from '../../Strings/escapeRegex';
import {isArray} from '../../Types/isArray';
import {isNumber} from '../../Types/isNumber';
import {isString} from '../../Types/isString';
import {isUndefined} from '../../Types/isUndefined';
import {filter} from '../filter';
import {map} from '../map';

const cachedPaths = {};

/**
 * This function can be used to convert a string into a path array.
 * It will also validate already existing path arrays.
 *
 * By default a period (.) is used to separate path parts like: "my.array.path" => ["my","array","path"].
 * If you require another separator you can set another one by using the separator parameter.
 * In most circumstances it will make more sense just to escape a separator, tho. Do that by using a backslash like:
 * "my\\.array.path" => ["my.array", "path"].
 *
 * @param path The path to parse as described above.
 * @param separator Default: "." Can be set to any string you want to use as separator of path parts.
 */
export function parsePath(path: ListPath, separator?: string): TListPathArray
{
    if (path === null || path === '' || isUndefined(path) || (isArray(path) && path.length === 0)) {
        return [];
    }
    
    if (isArray(path)) {
        // Path is array
        // @todo nested arrays don't get validated here, is it worth fixing? Or should we keep it as is, to save recursive lookup performance loss?
        const validPathParts = filter(path, (v) => isString(v) || isNumber(v) || isArray(v));
        
        if (validPathParts.length !== path.length) {
            throw new Error(
                'The given path array: ' + JSON.stringify(path) + ' should only contain numbers, strings and arrays!');
        }
        
        return map(validPathParts, (v) => !isArray(v) ? '' + v : v);
    }
    
    if (!isString(path) && !isNumber(path)) {
        throw new Error('The given path: ' + JSON.stringify(path) +
                        ' is not valid! Only strings, numbers and arrays are supported!');
    }
    
    // Path is a string or a number
    separator = separator ?? '.';
    let pathString: string = '' + path as string;
    const cacheKey = pathString + separator;
    if (!isUndefined(cachedPaths[cacheKey])) {
        return cachedPaths[cacheKey].slice(0);
    }
    
    // Remove braces
    let braces = new Map();
    if (pathString.indexOf('[') !== -1) {
        
        // Read the braces
        let braceId = 0;
        braces.set(braceId, '');
        for (let i = 0; i < pathString.length; i++) {
            const char = pathString.charAt(i);
            
            if (char === '[') {
                braces.set(braceId, braces.get(braceId) + '\\(\\b' + ++braceId + '\\)');
            }
            
            if (!braces.has(braceId)) {
                braces.set(braceId, '');
            }
            
            braces.set(braceId, braces.get(braceId) + char);
            
            if (char === ']') {
                braceId = Math.max(0, braceId - 1);
            }
        }
        
        // Split the stored braces into parts
        braces.forEach((v, k) => {
            if (k === 0) {
                return;
            }
            
            // Split at the comma
            braces.set(k,
                JSON.stringify(
                    map(
                        v.substr(1, v.length - 2).match(/(\\.|[^,])+/g),
                        (v) => {
                            v = v.trim();
                            
                            if (v.indexOf(separator) !== -1) {
                                return parsePath(v, separator);
                            }
                            
                            return v;
                        }
                    )
                )
            );
            
        });
        
        // First brace is the path
        pathString = braces.get(0);
        braces.delete(0);
    }
    
    // Split the path into parts
    const hasEscapedSeparators = pathString.indexOf('\\') !== -1;
    const seperatorPattern = escapeRegex(separator);
    let parts = map(
        pathString.match(new RegExp('(\\\\.|[^' + seperatorPattern + '])+', 'g')),
        (v: string) => v.trim()
    );
    
    // Remove empty parts
    parts = filter(parts, (v) => v !== '');
    
    // Remove escaped separators in created path keys
    if (hasEscapedSeparators) {
        const pattern = new RegExp('\\\\' + seperatorPattern, 'g');
        parts = map(parts, (v) => {
            return v.replace(pattern, separator);
        });
    }
    
    // Reinject brace content
    if (braces.size > 0) {
        let partString = JSON.stringify(parts);
        
        braces.forEach((v, k) => {
            partString = partString.replace(new RegExp('"[\\\\(]+b' + k + '[\\\\)]+"', 'g'), v);
        });
        
        parts = JSON.parse(partString);
    }
    
    // Done
    cachedPaths[cacheKey] = parts;
    return parts.slice(0);
}