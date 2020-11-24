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
 * Last modified: 2019.01.11 at 18:39
 */
import {GenericStorage, isBrowser, isNull, isString, isUndefined, PlainObject} from '..';

declare global
{
    interface Window
    {
        HELFERLEIN_GLOBAL_STORAGE?: PlainObject
    }
}

/**
 * A fallback local storage if this script is not called from a browser.
 */
let fallbackStorage = null;

/**
 * Provides access to a storage object on the window scope. Means multiple libraries may interact
 * with the storage and each other. The storage is only available for the current page. Means a refresh/page change
 * will flush all elements
 *
 * The storage will hold a list of GenericStorage objects.
 *
 * @param namespace
 */
export function getPageStorage(namespace?: string): GenericStorage
{
    if (!isBrowser()) {
        if (isNull(fallbackStorage)) {
            fallbackStorage = new GenericStorage();
        }
        return fallbackStorage;
    }
    
    if (isUndefined(window.HELFERLEIN_GLOBAL_STORAGE)) {
        window.HELFERLEIN_GLOBAL_STORAGE = {};
    }
    if (!isString(namespace)) {
        namespace = 'storage-' + (Math.random() + '').replace(/[^0-9]/g, '');
    }
    if (isUndefined(window.HELFERLEIN_GLOBAL_STORAGE[namespace])) {
        window.HELFERLEIN_GLOBAL_STORAGE[namespace] = new GenericStorage();
    }
    return window.HELFERLEIN_GLOBAL_STORAGE[namespace];
}