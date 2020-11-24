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
 * Last modified: 2020.11.24 at 01:01
 */

import {validatePattern} from './validatePattern';

// Extracted from https://github.com/febryardiansyah/regex-pattern/blob/master/src/regex/regex-pattern.ts
// The library is sadly not tree-shakable
const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&\/=]*)/;

/**
 * Checks if the given value looks like a valid url address
 * @param value
 */
export function validateUrl(value: string | any): boolean
{
    return validatePattern(value, pattern);
}