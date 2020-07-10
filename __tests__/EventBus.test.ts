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
 * Last modified: 2019.04.02 at 16:52
 */

import {EventBus} from '../src/Events/EventBus';
import {EventEmitterEvent} from '../src/Events/EventEmitter';

test('Event bus, bind and emit event', () => {
    const args = {
        foo: 'bar',
        bar: 123
    };
    let c = 0;
    EventBus.bind('test', (e: EventEmitterEvent) => {
        expect(e.args).toEqual(args);
        expect(e.args.foo).toBe('bar');
        expect(e.args.bar).toBe(123);
        c++;
    });
    expect(c).toBe(0);
    EventBus.emit('test', args);
    expect(c).toBe(1);
    EventBus.unbindAll();
});

test('Event bus, bind and unbind', () => {
    let c = 0;
    const callback1 = () => {
        c += 1;
    };
    const callback2 = () => {
        c += 10;
    };
    const callback3 = () => {
        c += 100;
    };
    EventBus.bind('test', callback1);
    EventBus.bind('test', callback2);
    EventBus.bind('test', callback3);
    EventBus.emit('test');
    expect(c).toBe(111);
    c = 0;
    
    EventBus.unbind('test', callback3);
    EventBus.emit('test');
    expect(c).toBe(11);
    c = 0;
    
    EventBus.unbind('test', callback1);
    EventBus.emit('test');
    expect(c).toBe(10);
    c = 0;
    
    EventBus.unbind('test', callback2);
    EventBus.emit('test');
    expect(c).toBe(0);
    EventBus.unbindAll();
});

test('Event bus, stop propagation', () => {
    let c = 0;
    const callback1 = () => {
        c += 1;
    };
    const callback2 = (e: EventEmitterEvent) => {
        c += 10;
        e.stopPropagation();
    };
    const callback3 = () => {
        c += 100;
    };
    EventBus.bind('test', callback1);
    EventBus.bind('test', callback2);
    EventBus.bind('test', callback3);
    EventBus.emit('test');
    expect(c).toBe(11);
    c = 0;
    
    EventBus.unbind('test', callback2);
    EventBus.emit('test');
    expect(c).toBe(101);
    EventBus.unbindAll();
});