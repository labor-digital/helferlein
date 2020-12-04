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
 * Last modified: 2019.01.09 at 11:32
 */
import {PlainObject} from '../Interfaces/PlainObject';
import {isObject} from './isObject';

/**
 * Returns true if the given value is a child of a plain object created with {} or new Object()
 * @param value
 */
export function isPlainObject(value): value is PlainObject
{
    return isObject(value) && Object.prototype.toString.call(value) === '[object Object]' &&
           typeof value.constructor === 'function' && value.constructor.prototype.hasOwnProperty('isPrototypeOf');
}