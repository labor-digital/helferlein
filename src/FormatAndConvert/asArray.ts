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
 * Last modified: 2019.01.11 at 18:13
 */
import {List} from '../Interfaces/List';
import {forEach} from '../Lists/forEach';
import {isList} from '../Lists/isList';
import {isNullOrUndef} from '../Types/isNullOrUndef';

/**
 * Converts a given object/map/set into an array
 * @param list
 * @return {Array}
 */
export function asArray(list: List): Array<any>
{
    if (isNullOrUndef(list)) {
        return [];
    }
    
    if (!isList(list)) {
        throw new Error('Could not determine the output type of a given element!');
    }
    
    const output = [];
    forEach(list, v => output.push(v));
    return output;
}