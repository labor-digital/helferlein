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
 * Last modified: 2019.01.22 at 18:02
 */
import {isBrowser} from '../Environment/isBrowser';
import {isNumber} from '../Types/isNumber';
import {isPlainObject} from '../Types/isPlainObject';
import {isString} from '../Types/isString';

interface LoadJsOptions
{
    /**
     * The timeout in milliseconds after which the promise should fail
     */
    timeout?: number,
    
    /**
     * The type of asset to load
     */
    type?: 'js' | 'css'
}

const loadedJs: Map<string, Promise<string>> = new Map();

/**
 * This helper may be used to load additional javascript or css files
 * to the current page. It will return a promise which resolves to the loaded url.
 *
 * NOTE: Should be called after the document is ready!
 *
 * @param url
 * @param options
 */
export function loadAsset(url: string, options?: LoadJsOptions): Promise<string>
{
    if (!isBrowser()) {
        throw new Error('loadAsset() only works in browsers!');
    }
    if (loadedJs.has(url)) {
        return loadedJs.get(url);
    }
    if (!isPlainObject(options)) {
        options = {};
    }
    const promise = new Promise<string>((resolve, reject) => {
        const timeoutTime = isNumber(options.timeout) ? options.timeout : 2000;
        const timeout = setTimeout(() => reject('Timeout after ' + timeoutTime + 'ms.'), timeoutTime);
        
        (new Promise(resolve1 => {
            const elType = isString(options.type) && options.type === 'css' ? 'css' : 'js';
            let el;
            if (elType === 'css') {
                el = document.createElement('link');
                el.rel = 'stylesheet';
                el.href = url;
            } else {
                el = document.createElement('script');
                el.type = 'text/javascript';
                el.src = url;
            }
            document.head.appendChild(el);
            el.onload = () => {
                resolve1();
            };
            el.onerror = (e) => {
                reject('An error occured while loading: "' + url + '"');
            };
            
        }).then(() => {
            clearTimeout(timeout);
            resolve(url);
        }));
        
    });
    loadedJs.set(url, promise);
    return promise;
}