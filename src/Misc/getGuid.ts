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
 * Last modified: 2019.02.01 at 13:32
 */

import {isBrowser} from '../Environment/isBrowser';
import {isNumber} from '../Types/isNumber';

const storageKey = 'HELFERLEIN_GUID_STORAGE';

const storage = (function () {
    if (isBrowser()) {
        return window;
    }
    return global;
})();

/**
 * Returns a globally unique, numeric id as a string
 * @param prefix
 */
export function getGuid(prefix?: string): string
{
    if (!isNumber(storage[storageKey])) {
        storage[storageKey] = 0;
    }
    return prefix + '' + storage[storageKey]++;
}