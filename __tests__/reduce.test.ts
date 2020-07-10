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
 * Last modified: 2019.01.09 at 13:41
 */

import {reduce} from '../src/Lists/reduce';

test('Reduce array', () => {
    let array = [1, 2, 3, 4, 5];
    let expected = [0, 1, 3, 6, 10];
    let c = 0;
    expect(reduce(array, (current, value, key, list) => {
        expect(current).toBe(expected[c]);
        expect(value).toBe(array[c]);
        expect(key).toBe(c);
        expect(list).toBe(array);
        c++;
        return current + value;
    }, 0)).toBe(15);
});

test('Reduce Map', () => {
    let map = new Map();
    map.set(0, 1);
    map.set(1, 2);
    map.set(2, 3);
    let expected = [0, 1, 3];
    let c = 0;
    expect(reduce(map, (current, value, key, list) => {
        expect(current).toBe(expected[c]);
        expect(value).toBe(map.get(c));
        expect(key).toBe(c);
        expect(list).toBe(map);
        c++;
        return current + value;
    }, 0)).toBe(6);
});

test('Reduce Set', () => {
    let set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    let expected = [0, 1, 3];
    let c = 0;
    expect(reduce(set, (current, value, key, list) => {
        expect(current).toBe(expected[c]);
        expect(value).toBe(c + 1);
        expect(key).toBe(c);
        expect(list).toBe(set);
        c++;
        return current + value;
    }, 0)).toBe(6);
});

test('Reduce Error on invalid', () => {
    expect(() => {
        // @ts-ignore
        reduce(true, (current, value, key, list) => {}, 0);
    }).toThrow();
});