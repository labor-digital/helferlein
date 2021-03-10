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
 * Last modified: 2021.03.10 at 11:46
 */

import {isNode} from '../Environment/isNode';
import type {PlainObject} from '../Interfaces/PlainObject';
import {isUndefined} from '../Types/isUndefined';
import {canUseFetch} from './canUseFetch';
import {fetchWithTimeout} from './fetchWithTimeout';

/**
 * Holds the list of states and their check timestamp for each requested uri
 */
const stateList: PlainObject<boolean> = {};

/**
 * Internal helper to execute the request, either using fetch, the node https module or a classic XMLHttpRequest
 * @param uri
 */
function makeRequest(uri: string): Promise<boolean>
{
    if (canUseFetch()) {
        return fetchWithTimeout(uri, {timeout: 1000}).then(res => res.ok).catch(() => false);
    }
    
    if (isNode()) {
        return new Promise<boolean>(resolve => {
            const {URL} = require('url');
            const parsed = new URL(uri);
            require('https').get({
                host: parsed.hostname,
                path: parsed.pathname,
                timeout: 1000
            }, (res: any) => {
                res.on('error', () => resolve(false));
                res.on('data', () => resolve(true));
            }).on('error', () => resolve(false));
        });
    }
    
    return new Promise<boolean>(resolve => {
        const req = new XMLHttpRequest();
        req.timeout = 1000;
        req.addEventListener('load', () => resolve(true));
        req.addEventListener('error', () => resolve(false));
        req.addEventListener('timeout', () => resolve(false));
        req.open('GET', uri);
        req.send();
    });
}

/**
 * Checks if the client is currently online or not.
 * This methoed will execute a request to a online resource and does not rely on navigator.isOnline,
 * to reliably if a internet connection can be used.
 *
 * Note:
 * @param pingUrl The url of an endpoint, you know that is online. If not provided, we use
 *                https://ping.labor.tools/ which is a secure, no tracking endpoint that just sends you a "pong" response.
 *                It is routed through cloudflare and hosted on github: https://github.com/labor-digital/ping-endpoint
 * @param stateTtl A numeric value in milliseconds to define how long a state should be cached. By default the
 *                 state is cached for 60 seconds.
 */
export function checkOnlineState(pingUrl?: string, stateTtl?: number): Promise<boolean>
{
    stateTtl = stateTtl ?? 60 * 1000;
    
    return new Promise(resolve => {
        pingUrl = pingUrl ?? 'https://ping.labor.tools';
        
        if (!isUndefined(stateList[pingUrl])) {
            resolve(stateList[pingUrl]);
            return;
        }
        
        const del = () => delete stateList[pingUrl!];
        
        makeRequest(pingUrl)
            .then((res) => {
                if (res) {
                    stateList[pingUrl!] = res;
                    setTimeout(del, stateTtl);
                } else {
                    del();
                }
                
                resolve(res);
            })
            .catch(() => {
                del();
                resolve(false);
            });
    });
}