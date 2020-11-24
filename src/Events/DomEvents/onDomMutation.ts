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
 * Last modified: 2019.04.02 at 15:57
 */

import {isBrowser} from '../..';

/**
 * Creates a mutation observer for a given target object
 * Every time a mutation occurs the supplied callback will be executed
 * @param target
 * @param callback
 */
export function onDomMutation(target: HTMLElement, callback: Function): MutationObserver
{
    if (!isBrowser()) {
        return {
            observe(target: Node, options?: MutationObserverInit): void
            {
            },
            disconnect(): void
            {
            },
            takeRecords(): any
            {
            }
        };
    }
    const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
        callback({target, mutations, observer});
    });
    observer.observe(
        target as any,
        {attributes: true, childList: true, characterData: true, subtree: true}
    );
    return observer;
}