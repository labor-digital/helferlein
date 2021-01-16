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
 * Last modified: 2019.01.09 at 14:50
 */
import {merge} from '../src/Lists/merge';

test('Simple array merge', () => {
    expect(merge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
});

test('Simple multi array merge', () => {
    expect(merge([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});

test('Recursive array merge', () => {
    expect(merge([1, [2, 3]], [6, [4, 5], 7])).toEqual([1, [2, 3], 6, [4, 5], 7]);
});

test('Merge with null override', () => {
    expect(merge({foo: {bar: [123, 234]}}, {foo: {bar: null}})).toEqual({foo: {bar: null}});
    expect(merge({foo: {bar: [123, 234]}}, {foo: null})).toEqual({foo: null});
    expect(merge({foo: {bar: [123, 234]}}, {foo: {bar: [null]}})).toEqual({foo: {bar: [123, 234, null]}});
});

test('Simple object merge', () => {
    expect(merge({
        a: 1,
        b: 2
    }, {
        b: 5,
        c: 3,
        d: 4
    })).toEqual({
        a: 1,
        b: 5,
        c: 3,
        d: 4
    });
});

test('Recursive object merge', () => {
    expect(merge({
        a: 1,
        b: 2,
        c: {
            a: 'a',
            b: 'b',
            c: [1, 2, 3]
        },
        d: []
    }, {
        c: {
            a: 'foo',
            c: [4, 5, 6]
        },
        d: {
            1: 'a',
            2: 'b'
        }
    })).toEqual({
        a: 1,
        b: 2,
        c: {
            a: 'foo',
            b: 'b',
            c: [1, 2, 3, 4, 5, 6]
        },
        d: ['a', 'b']
    });
});

test('Simple set merge', () => {
    let a = new Set();
    a.add(1);
    a.add(2);
    let b = new Set();
    b.add(1);
    b.add(3);
    b.add(4);
    
    let c = new Set();
    c.add(1);
    c.add(2);
    c.add(3);
    c.add(4);
    
    expect(merge(a, b)).toEqual(c);
});

test('Recursive set merge', () => {
    let a = new Set();
    a.add(1);
    a.add([1, 2]);
    a.add(3);
    let b = new Set();
    b.add(1);
    b.add([2, 3, 4]);
    b.add(4);
    
    let c = new Set();
    c.add(1);
    c.add([1, 2]);
    c.add(3);
    c.add([2, 3, 4]);
    c.add(4);
    
    expect(merge(a, b)).toEqual(c);
});

test('Simple map merge', () => {
    let a = new Map();
    a.set(0, 1);
    a.set(1, 2);
    let b = new Map();
    b.set(2, 1);
    b.set(3, 3);
    b.set(4, 4);
    
    let c = new Map();
    c.set(0, 1);
    c.set(1, 2);
    c.set(2, 1);
    c.set(3, 3);
    c.set(4, 4);
    
    expect(merge(a, b)).toEqual(c);
});

test('Recursive map merge', () => {
    let a = new Map();
    a.set(0, 1);
    a.set(1, 2);
    a.set(2, new Map());
    
    let b = new Map();
    b.set(2, {
        'foo': [123],
        'bar': 'baz',
        1: 5
    });
    b.set(3, 3);
    b.set(4, 4);
    
    let c = {
        2: [2, 4]
    };
    
    let d1 = new Map();
    d1.set('foo', [123]);
    d1.set('bar', 'baz');
    d1.set(0, 2);
    d1.set(1, 4);
    
    let d = new Map();
    d.set(0, 1);
    d.set(1, 2);
    d.set(2, d1);
    d.set(3, 3);
    d.set(4, 4);
    
    expect(merge(a, b, c)).toEqual(d);
});

test('merge of nested objects', () => {
    const a = {
        a: {
            a: {
                a: 1
            },
            b: {
                a: 1
            },
            c: {
                a: 1
            }
        },
        b: {
            b: {
                b: 2
            }
        }
    };
    const b = {
        a: {
            a: {
                b: 123
            }
        }
    };
    const c = {
        a: {
            a: {
                a: 1,
                b: 123
            },
            b: {
                a: 1
            },
            c: {
                a: 1
            }
        },
        b: {
            b: {
                b: 2
            }
        }
    };
    expect(merge(a, b)).toEqual(c);
});