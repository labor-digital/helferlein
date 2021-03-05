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
 * Last modified: 2019.04.02 at 17:41
 */

import {ComponentProxy} from '../src/Entities/ComponentProxy';
import {EventBus} from '../src/Events/EventBus';

test('Component Proxy, event binding and unbinding', () => {
    class CPTestDummy
    {
        public test()
        {
            const proxy = new ComponentProxy(this);
            let c = 0;
            const that = this;
            const callback = function (e) {
                c++;
                expect(this).toBe(that);
                expect(e.args.foo).toBe(1);
            };
            proxy.bind(EventBus, 'test', callback);
            proxy.emit(EventBus, 'test', {foo: 1});
            EventBus.emit('test', {foo: 1});
            EventBus.getEmitter().emit('test', {foo: 1});
            expect((proxy as any).events.size).toBe(1);
            
            proxy.unbind(EventBus, 'test', callback);
            proxy.emit(EventBus, 'test', {foo: 1});
            expect(c).toBe(3);
            expect((proxy as any).events).toEqual(new Map());
        }
    }
    
    (new CPTestDummy()).test();
});

test('Component Proxy, event unbinding on destroy', () => {
    class CPTestDummy
    {
        public test()
        {
            const proxy = new ComponentProxy(this);
            let c = 0;
            const that = this;
            const callback = function (e) {
                c++;
                expect(this).toBe(that);
                expect(e.args.foo).toBe(1);
            };
            
            proxy.bind(EventBus, 'test', callback);
            proxy.emit(EventBus, 'test', {foo: 1});
            expect(c).toBe(1);
            EventBus.emit('test', {foo: 1});
            expect(c).toBe(2);
            EventBus.getEmitter().emit('test', {foo: 1});
            expect(c).toBe(3);
            
            proxy.destroy();
            
            proxy.emit(EventBus, 'test', {foo: 1});
            proxy.unbind(EventBus, 'test', callback);
            proxy.emit(EventBus, 'test', {foo: 1});
            EventBus.emit('test', {foo: 1});
            EventBus.getEmitter().emit('test', {foo: 1});
            expect(c).toBe(3);
        }
    }
    
    (new CPTestDummy()).test();
});