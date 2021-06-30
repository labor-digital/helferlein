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

import {EventBus, EventEmitter, EventEmitterEvent, HelferleinEventList, registerEventBusEmitterBridge} from '../src';

test('pass along default events', () => {
    let c = 0;
    const emitter = new EventEmitter();
    emitter.bind(HelferleinEventList.EVENT_SCROLL_THROTTLED, () => c++);
    
    registerEventBusEmitterBridge(emitter);
    
    EventBus.emit(HelferleinEventList.EVENT_SCROLL_THROTTLED);
    expect(c).toBe(1);
});

test('pass along default event arguments', () => {
    const emitter = new EventEmitter();
    emitter.bind(HelferleinEventList.EVENT_SCROLL_THROTTLED, (e: EventEmitterEvent) => {
        expect(e.args.foo).toBe('bar');
    });
    
    registerEventBusEmitterBridge(emitter);
    
    EventBus.emit(HelferleinEventList.EVENT_SCROLL_THROTTLED, {foo: 'bar'});
});

test('pass along additional events', () => {
    let c = 0;
    const emitter = new EventEmitter();
    emitter.bind('someEvent', () => c++);
    
    registerEventBusEmitterBridge(emitter, ['someEvent']);
    
    EventBus.emit('someEvent');
    expect(c).toBe(1);
});

test('don\'t pass along not registered events', () => {
    let c = 0;
    const emitter = new EventEmitter();
    emitter.bind('someEvent', () => c++);
    
    registerEventBusEmitterBridge(emitter);
    
    EventBus.emit('someEvent');
    expect(c).toBe(0);
});
