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
 * Last modified: 2020.11.14 at 15:26
 */

import {ListType} from '../Interfaces/List';
import {getListType} from './listAccess';

/**
 * Returns true if the given value is a valid list we can use in list actions
 * @param v
 */
export function isList(v: any): boolean
{
    return getListType(v) !== ListType.NoList;
}