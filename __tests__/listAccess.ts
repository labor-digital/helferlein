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

import {
    getFirstInList,
    getLastInList,
    getListKeys,
    getListType,
    getListValue,
    getNewList,
    getNthInList,
    listIntersect,
    ListType
} from '../src/Lists/listAccess';

const fixtures = {
    array: () => [1, 2, 3, 4],
    set: () => new Set([1, 2, 3, 4]),
    map: () => new Map([['foo', 'bar'], ['bar', 'baz'], ['baz', 'foo']]),
    iterator: () => fixtures.map().values()
};

// ========================================================
// getListType
// ========================================================
test('getListType', () => {
    expect(getListType([])).toEqual(ListType.Array);
    expect(getListType({})).toEqual(ListType.Object);
    expect(getListType(new Set)).toEqual(ListType.Set);
    expect(getListType(new Map)).toEqual(ListType.Map);
    expect(getListType((new Set()).values())).toEqual(ListType.Iterator);
    expect(getListType((new Map()).values())).toEqual(ListType.Iterator);
    
    expect(getListType(null)).toEqual(ListType.NoList);
    expect(getListType(123)).toEqual(ListType.NoList);
    expect(getListType(undefined)).toEqual(ListType.NoList);
    expect(getListType(NaN)).toEqual(ListType.NoList);
});

// ========================================================
// getNewList
// ========================================================
test('getNewList', () => {
    expect(getNewList(ListType.Array)).toEqual([]);
    expect(getNewList(ListType.Object)).toEqual({});
    expect(getNewList(ListType.Set)).toEqual(new Set());
    expect(getNewList(ListType.Map)).toEqual(new Map());
    expect(getNewList(ListType.Iterator)).toEqual([]);
    expect(() => getNewList(ListType.NoList)).toThrowError();
});


// ========================================================
// getListKeys
// ========================================================
test('getListKeys', () => {
    expect(getListKeys(fixtures.array())).toEqual([0, 1, 2, 3]);
    expect(getListKeys(fixtures.set())).toEqual([0, 1, 2, 3]);
    expect(getListKeys(fixtures.map())).toEqual(['foo', 'bar', 'baz']);
    expect(getListKeys(fixtures.iterator())).toEqual([0, 1, 2]);
});

// ========================================================
// getListValue
// ========================================================
test('getListValue', () => {
    expect(getListValue(fixtures.array(), 0)).toEqual(1);
    expect(getListValue(fixtures.array(), 3)).toEqual(4);
    
    expect(getListValue(fixtures.set(), 0)).toEqual(1);
    expect(getListValue(fixtures.set(), 3)).toEqual(4);
    
    expect(getListValue(fixtures.map(), 'foo')).toEqual('bar');
    expect(getListValue(fixtures.map(), 'baz')).toEqual('foo');
    
    expect(getListValue(fixtures.iterator(), 0)).toEqual('bar');
    expect(getListValue(fixtures.iterator(), 1)).toEqual('baz');
});

// ========================================================
// getNthInList
// ========================================================
test('getNthInList', () => {
    expect(getNthInList(fixtures.array(), 0)).toEqual(1);
    expect(getNthInList(fixtures.array(), 3)).toEqual(4);
    
    expect(getNthInList(fixtures.set(), 0)).toEqual(1);
    expect(getNthInList(fixtures.set(), 3)).toEqual(4);
    
    expect(getNthInList(fixtures.map(), 0)).toEqual('bar');
    expect(getNthInList(fixtures.map(), 1)).toEqual('baz');
    
    expect(getNthInList(fixtures.iterator(), 0)).toEqual('bar');
    expect(getNthInList(fixtures.iterator(), 1)).toEqual('baz');
    expect(getNthInList(fixtures.iterator(), 2)).toEqual('foo');
    
    // Keys
    expect(getNthInList(fixtures.array(), 0, true)).toEqual(0);
    expect(getNthInList(fixtures.array(), 3, true)).toEqual(3);
    
    expect(getNthInList(fixtures.set(), 0, true)).toEqual(0);
    expect(getNthInList(fixtures.set(), 3, true)).toEqual(3);
    
    expect(getNthInList(fixtures.map(), 0, true)).toEqual('foo');
    expect(getNthInList(fixtures.map(), 1, true)).toEqual('bar');
    
    expect(getNthInList(fixtures.iterator(), 0, true)).toEqual(0);
    expect(getNthInList(fixtures.iterator(), 1, true)).toEqual(1);
    expect(getNthInList(fixtures.iterator(), 2, true)).toEqual(2);
});

// ========================================================
// getFirstInList
// ========================================================
test('getFirstInList', () => {
    expect(getFirstInList(fixtures.array())).toEqual(1);
    expect(getFirstInList(fixtures.set())).toEqual(1);
    expect(getFirstInList(fixtures.map())).toEqual('bar');
    expect(getFirstInList(fixtures.iterator())).toEqual('bar');
    
    // Keys
    expect(getFirstInList(fixtures.array(), true)).toEqual(0);
    expect(getFirstInList(fixtures.set(), true)).toEqual(0);
    expect(getFirstInList(fixtures.map(), true)).toEqual('foo');
    expect(getFirstInList(fixtures.iterator(), true)).toEqual(0);
});

// ========================================================
// getLastInList
// ========================================================
test('getLastInList', () => {
    expect(getLastInList(fixtures.array())).toEqual(4);
    expect(getLastInList(fixtures.set())).toEqual(4);
    expect(getLastInList(fixtures.map())).toEqual('foo');
    expect(getLastInList(fixtures.iterator())).toEqual('foo');
    
    // Keys
    expect(getLastInList(fixtures.array(), true)).toEqual(3);
    expect(getLastInList(fixtures.set(), true)).toEqual(3);
    expect(getLastInList(fixtures.map(), true)).toEqual('baz');
    expect(getLastInList(fixtures.iterator(), true)).toEqual(2);
});

// ========================================================
// listIntersect
// ========================================================
test('listIntersect', () => {
    expect(listIntersect(fixtures.array(), [])).toEqual([]);
    expect(listIntersect(fixtures.array(), new Set([1, 9]))).toEqual([1]);
    expect(listIntersect([1, 2, 3, 3, 4, 5, 66, 7, 4], [2, 3, 4, 9, 11])).toEqual([2, 3, 4]);
    expect(listIntersect(new Set(['foo', 'bar']), ['bar', 'baz'])).toEqual(['bar']);
});