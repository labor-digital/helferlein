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
 * Last modified: 2019.01.09 at 13:43
 */
import {asArray} from '../src/FormatAndConvert/asArray';

test('asArray with Object', () => {
    expect(asArray({'a': 1, 'b': 2, 'd': 3, 'e': 'asdf'})).toEqual([1, 2, 3, 'asdf']);
});

test('asArray with Array', () => {
    expect(asArray([1, 2, 3, 'asdf'])).toEqual([1, 2, 3, 'asdf']);
});

test('asArray with Set', () => {
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add('asdf');
    expect(asArray(list)).toEqual([1, 2, 3, 'asdf']);
});

test('asArray with Map', () => {
    let list = new Map();
    list.set('a', 1);
    list.set('aa', 2);
    list.set('aaa', 3);
    list.set('aaaa', 'asdf');
    expect(asArray(list)).toEqual([1, 2, 3, 'asdf']);
});

test('asArray empty array with null or undefined', () => {
    expect(asArray(null as any)).toEqual([]);
    expect(asArray(undefined as any)).toEqual([]);
});

test('asArray to die if a non-iterable object was given', () => {
    expect(() => {
        // @ts-ignore
        asArray(true);
    }).toThrow();
});