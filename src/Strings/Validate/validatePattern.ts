/*
 * Copyright 2020 LABOR.digital
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
 * Last modified: 2020.11.24 at 00:56
 */

/**
 * Returns true if the given pattern was matched by the value
 * @param value
 * @param pattern
 */
export function validatePattern(value: string | any, pattern: RegExp | string): boolean
{
    if (!value || !pattern) {
        return false;
    }
    if (typeof value !== 'string') {
        return false;
    }
    return !!value.match(new RegExp(pattern));
}