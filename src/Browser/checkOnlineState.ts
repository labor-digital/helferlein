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
 * Last modified: 2019.02.07 at 15:37
 */

import {isBrowser} from '..';
import {ajax} from './ajax';

/**
 * True if the browser can reach the internet, false if not
 */
let onlineState: boolean = false;

/**
 * The timestamp of the last time this script ran
 */
let lastCheck: number = 0;

/**
 * Checks if the client is currently online or not
 * @deprecated will be removed in the next major version -> use a library like axios
 */
export function checkOnlineState(): Promise<boolean>
{
    return new Promise(resolve => {
        if (!isBrowser()) {
            return resolve(false);
        }
        if (lastCheck > (Date.now() - (30 * 1000))) {
            resolve(onlineState);
            return;
        }
        ajax({
            url: 'http://laboranten.net/_extern/labor-javascript-online-check/',
            timeout: 1000
        }).then(() => {
            lastCheck = Date.now();
            onlineState = true;
            resolve(true);
        }).catch(() => {
            lastCheck = 0;
            onlineState = false;
            resolve(false);
        });
    });
}