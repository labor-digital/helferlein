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
 * Last modified: 2019.11.10 at 20:55
 */

import {chunks} from '../src/Lists/chunks';

test('chunks with object', () => {
    expect(chunks({'a': 1, 'b': 2, 'd': 3, 'e': 'asdf', 'f': 4, 'g': 5, 'h': 6}, 3)).toEqual([
        {a: 1, b: 2, d: 3},
        {e: 'asdf', f: 4, g: 5},
        {h: 6}
    ]);
});
test('chunks with exact object', () => {
    expect(chunks({'a': 1, 'b': 2, 'd': 3, 'e': 'asdf', 'f': 4, 'g': 5}, 3)).toEqual([
        {a: 1, b: 2, d: 3},
        {e: 'asdf', f: 4, g: 5}
    ]);
});
test('chunks with array', () => {
    expect(chunks(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], 3)).toEqual([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h']
    ]);
});
test('chunks with exact array', () => {
    expect(chunks(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 3)).toEqual([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ]);
});