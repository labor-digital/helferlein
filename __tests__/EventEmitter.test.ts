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

import {EventEmitter, EventEmitterCallbackEventListener, EventEmitterEvent} from '../src/Events/EventEmitter';

test('Event emitter, emit unknown event', () => {
    const emitter = new EventEmitter();
    emitter.emit('unknownEvent', {});
});

test('Event emitter, bind and emit event', () => {
    const emitter = new EventEmitter();
    
    const args = {
        foo: 'bar',
        bar: 123
    };
    let c = 0;
    emitter.bind('test', (e: EventEmitterEvent) => {
        expect(e.args).toEqual(args);
        expect(e.args.foo).toBe('bar');
        expect(e.args.bar).toBe(123);
        c++;
    });
    expect(c).toBe(0);
    emitter.emit('test', args);
    expect(c).toBe(1);
});

test('Event emitter, bind and unbind', () => {
    const emitter = new EventEmitter();
    
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
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    emitter.emit('test');
    expect(c).toBe(111);
    c = 0;
    
    emitter.unbind('test', callback3);
    emitter.emit('test');
    expect(c).toBe(11);
    c = 0;
    
    emitter.unbind('test', callback1);
    emitter.emit('test');
    expect(c).toBe(10);
    c = 0;
    
    emitter.unbind('test', callback2);
    emitter.emit('test');
    expect(c).toBe(0);
    c = 0;
    
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    return emitter.emitHook('test', {})
                  .then(() => {
                      expect(c).toBe(111);
                      c = 0;
                      return true;
                  })
                  .then(() => {
                      emitter.unbind('test', callback3);
                      return emitter.emitHook('test', {}).then(() => {
                          expect(c).toBe(11);
                          c = 0;
                      });
                  })
                  .then(() => {
                      emitter.unbind('test', callback1);
                      return emitter.emitHook('test', {}).then(() => {
                          expect(c).toBe(10);
                          c = 0;
                      });
                  })
                  .then(() => {
                      emitter.unbind('test', callback2);
                      return emitter.emitHook('test', {}).then(() => {
                          expect(c).toBe(0);
                      });
                  });
});

test('Event emitter, stop propagation', () => {
    const emitter = new EventEmitter();
    
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
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    emitter.emit('test');
    expect(c).toBe(11);
    c = 0;
    
    emitter.emitHook('test', {});
    expect(c).toBe(11);
    c = 0;
    
    emitter.unbind('test', callback2);
    emitter.emit('test');
    expect(c).toBe(101);
    c = 0;
    
    // Test hook emitting
    emitter.unbindAll();
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    return emitter.emitHook('test', {})
                  .then(() => {
                      expect(c).toBe(11);
                      c = 0;
                      return true;
                  }).then(() => {
            emitter.unbind('test', callback2);
            return emitter.emitHook('test', {})
                          .then(() => {
                              expect(c).toBe(101);
                          });
        });
});

test('Event emitter, unbind all', () => {
    const emitter = new EventEmitter();
    
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
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    emitter.bind('test2', callback3);
    emitter.unbindAll('test');
    emitter.emit('test');
    expect(c).toBe(0);
    emitter.emit('test2');
    expect(c).toBe(100);
    c = 0;
    
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    emitter.unbindAll();
    emitter.emit('test');
    emitter.emit('test2');
    expect(c).toBe(0);
    c = 0;
    
    emitter.unbindAll();
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    emitter.bind('test2', callback3);
    emitter.unbindAll('test');
    return emitter.emitHook('test', {})
                  .then(() => {
                      expect(c).toBe(0);
                      return emitter.emitHook('test2', {}).then(() => {
                                        expect(c).toBe(100);
                                        c = 0;
                                        return true;
                                    })
                                    .then(() => {
                                        emitter.bind('test', callback1);
                                        emitter.bind('test', callback2);
                                        emitter.bind('test', callback3);
                                        emitter.unbindAll();
                                        return emitter.emitHook('test', {})
                                                      .then(() => {
                                                          return emitter.emitHook('test2', {}).then(() => {
                                                              expect(c).toBe(0);
                                                          });
                                                      });
                                    });
        
                  });
});

test('Event emitter, as callbacks', () => {
    const emitter = new EventEmitter(true);
    let c = 0;
    const callback1: EventEmitterCallbackEventListener = (arg1, arg2) => {
        c += arg1 + arg2;
    };
    const callback2 = (arg1: any, arg2: any) => {
        c += arg1 + arg2;
    };
    const callback3 = (arg1: any, arg2: any) => {
        c += arg1 + arg2;
    };
    emitter.bind('test', callback1);
    emitter.bind('test', callback2);
    emitter.bind('test', callback3);
    emitter.emit('test', {arg1: 1, arg2: 10});
    expect(c).toBe(33);
    
    c = 0;
    return emitter.emitHook('test', {arg1: 1, arg2: 10}).then(() => {
        expect(c).toBe(33);
    });
});