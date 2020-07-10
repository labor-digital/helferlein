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
 * Last modified: 2019.04.02 at 15:38
 */

import {isBrowser} from '../../Environment/isBrowser';
import {PlainObject} from '../../Interfaces/PlainObject';
import {isPlainObject} from '../../Types/isPlainObject';

/**
 * Emits a dom event on a single html element, the document or the window object
 * @param target the element to emit the event on
 * @param event the name of the event to emit
 * @param args additional arguments to pass to the event
 */
export function emitDomEvent(target: Document | Window | HTMLElement, event: string, args?: PlainObject)
{
    if (!isBrowser()) {
        return;
    }
    const e = document.createEvent('Event') as any;
    e.initEvent(event, true, true);
    e.args = isPlainObject(args) ? args : {};
    (target as HTMLElement).dispatchEvent(e);
}