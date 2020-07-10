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
 * Last modified: 2019.06.12 at 12:32
 */

import {getListKeys} from '../src/Lists/listAccess';

test('getListKeys of array', () => {
    expect(getListKeys([1, 2, 3, 4])).toEqual([0, 1, 2, 3]);
});

test('getListKeys of set', () => {
    const s = new Set();
    s.add(1);
    s.add(2);
    s.add(2);
    s.add(3);
    expect(getListKeys(s)).toEqual([0, 1, 2]);
});

test('getListKeys of map', () => {
    const m = new Map();
    m.set('foo', 'bar');
    m.set('bar', 'baz');
    m.set(1, 'foo');
    expect(getListKeys(m)).toEqual(['foo', 'bar', 1]);
});