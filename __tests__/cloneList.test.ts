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
 * Last modified: 2019.12.30 at 21:11
 */

import type {PlainObject} from '../src/Interfaces/PlainObject';
import {cloneList} from '../src/Lists/cloneList';

test('cloneList of array', () => {
    const o = [1, 2, 3, 4];
    const clone = cloneList(o);
    expect(clone).toEqual(o);
    expect(clone).not.toBe(o);
});

test('cloneList of plain object', () => {
    const o = {
        a: 1,
        b: 'asdf',
        c: 'foo'
    };
    const clone = cloneList(o);
    expect(clone).toEqual(o);
    expect(clone).not.toBe(o);
});

test('cloneList of deep plain object', () => {
    const o = {
        a: 1,
        b: 'asdf',
        c: [
            1, 2, 3, 4, {foo: 123, bar: 'asdf'}
        ]
    };
    const clone: PlainObject = cloneList(o);
    expect(clone).toEqual(o);
    expect(clone).not.toBe(o);
    expect(clone.c[4]).toEqual(o.c[4]);
    expect(clone.c[4]).not.toBe(o.c[4]);
});

test('cloneList of advanced plain object', () => {
    const m = new Map();
    m.set('foo', 'bar');
    m.set('bar', 123);
    const s = new Set();
    s.add(1);
    s.add('foo');
    const o = {
        a: 1,
        b: 'asdf',
        c: 'foo',
        d: m,
        e: {
            s: s
        }
    };
    const clone: PlainObject = cloneList(o);
    expect(clone).toEqual(o);
    expect(clone).not.toBe(o);
    expect(clone.d).toEqual(m);
    expect(clone.d).not.toBe(m);
    expect(clone.e).toEqual(o.e);
    expect(clone.e).not.toBe(o.e);
    expect(clone.e.s).toEqual(o.e.s);
    expect(clone.e.s).not.toBe(s);
});