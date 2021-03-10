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
 * Last modified: 2019.01.09 at 11:10
 */
import {isFunction} from './isFunction';
import {isNullOrUndef} from './isNullOrUndef';
import {isUndefined} from './isUndefined';

const hasBuiltInArrayDetection = !isUndefined(Array) && isFunction(Array.isArray);

/**
 * Returns true if the given value is an array, false if not
 * @param value
 */
export function isArray<T = any>(value: any): value is Array<T>
{
    return hasBuiltInArrayDetection ? Array.isArray(value) : !isNullOrUndef(value) && value.constructor === Array;
}