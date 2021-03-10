/*
 * Copyright 2021 LABOR.digital
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
 * Last modified: 2021.03.10 at 11:57
 */

import {canUseFetch} from './canUseFetch';

export interface FetchWithTimeoutRequestInit extends RequestInit
{
    /**
     * A timespan in milliseconds after which the request should time out.
     * The default is 5000
     */
    timeout?: number;
}

/**
 * A wrapper around the browsers fetch api that allows you to define a timeout in milliseconds
 * without worring about the abort controller
 * @param url
 * @param options
 */
export function fetchWithTimeout(url: string, options?: FetchWithTimeoutRequestInit): Promise<any>
{
    if (!canUseFetch()) {
        throw new Error('You current environment does not support the fetch api!');
    }
    
    var controller = new AbortController();
    options = options ?? {};
    const timeout = options.timeout ?? 5000;
    
    delete options.timeout;
    options = {...options, signal: controller.signal};
    
    const ts = setTimeout(() => controller.abort(), timeout);
    
    return fetch(url, options)
        .then(response => {
            clearTimeout(ts);
            return response;
        });
}