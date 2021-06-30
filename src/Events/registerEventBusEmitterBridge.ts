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
 * Last modified: 2021.06.30 at 12:29
 */

import {forEach} from '../Lists/forEach';
import {EventBus} from './EventBus';
import type {EventEmitter} from './EventEmitter';
import {HelferleinEventList} from './HelferleinEventList';

/**
 * Helper to create a bridge between event bus events and a localized event emitter.
 * The method will automatically pass through all helferlein events emitted on the event bus to the provided
 * event emitter instance. You can also provide additional, non helferlein events you want to pass as well.
 *
 * @param emitter The event emitter to pass the events on to
 * @param additionalEvents Optional, additional events to be passed on
 */
export function registerEventBusEmitterBridge(emitter: EventEmitter, additionalEvents?: Array<string>): void
{
    
    const events = [
        ...additionalEvents ?? [],
        HelferleinEventList.EVENT_ON_HASH_CHANGE,
        HelferleinEventList.EVENT_HASH_UPDATE,
        HelferleinEventList.EVENT_RESIZE_THROTTLED,
        HelferleinEventList.EVENT_SCROLL_THROTTLED,
        HelferleinEventList.EVENT_BREAKPOINT_CHANGE
    ];
    
    forEach(events, event => {
        EventBus.bind(event, e => {
            const args = e.args || {};
            args.originalEvent = e;
            emitter.emit(event, args);
        });
    });
    
}