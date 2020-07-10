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
 * Last modified: 2019.07.25 at 10:03
 */

import {List} from '../Interfaces/List';

export type MakeOptionTypes =
    'boolean'
    | 'bool'
    | 'true'
    | 'false'
    | 'number'
    | 'numeric'
    | 'string'
    | 'null'
    | 'callable'
    | 'undefined'
    | 'object'
    | 'plainObject'
    | string;

export interface MakeOptionsOptions
{
    /**
     * If set to true, unknown keys will be ignored and kept in the result, otherwise an exception is thrown
     */
    allowUnknown: boolean
}

export interface MakeOptionsFilter
{
    (v: any, k: string, list: List, def: MakeOptionsValueDefinition, path: Array<string>): any
}

export interface MakeOptionsValidator
{
    (v: any, k: string, list: List, def: MakeOptionsValueDefinition, path: Array<string>): boolean | string | Array<any>
}

export interface MakeOptionsValueDefinition
{
    /**
     * This is the default value to use when the key in $options is empty.
     * If not set the option key is required! If the default value is a Closure the closure is called
     * and it's result is used as value.
     * The callback receives $key, $options, $definition, $path(For child arrays)
     */
    default?: any
    
    /**
     * Allows basic type validation of the input. Can either be a string or an array of strings.
     */
    type?: MakeOptionTypes | Array<MakeOptionTypes>
    
    preFilter?: MakeOptionsFilter
    filter?: MakeOptionsFilter
    validator?: MakeOptionsValidator
    values?: Array<any>
    children?: MakeOptionsDefinition
}

export interface MakeOptionsDefinition
{
    [key: string]: MakeOptionsValueDefinition
}