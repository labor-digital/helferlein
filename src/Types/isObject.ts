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
 * Last modified: 2019.01.09 at 11:59
 */
export function isObject(value: any, allowNull: true): value is Object | null
export function isObject(value: any, allowNull: false): value is Object & NonNullable<any>
export function isObject(value: any, allowNull?: boolean): value is Object & NonNullable<any>

/**
 * Returns true if the given value is an object of some kind and NOT NULL
 * @param value
 * @param allowNull True if null should also return TRUE
 */
export function isObject(value: any, allowNull?: boolean)
{
    return typeof value === 'object' && (allowNull === true || value !== null);
}