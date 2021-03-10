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
 * Last modified: 2019.01.11 at 18:14
 */
import {GenericStorage} from '../src/Entities/GenericStorage';
import type {GenericStorageWatcher} from '../src/Entities/GenericStorageInterface';
import {forEach} from '../src/Lists/forEach';

test('GenericStorage construction', () => {
    expect(new GenericStorage()).toBeInstanceOf(GenericStorage);
});

test('GenericStorage get storage link', () => {
    const storage = {'foo': 123};
    const i = new GenericStorage(storage);
    // External storage object
    expect(i.get()).toBe(storage);
    
    // Auto created storage object
    expect((new GenericStorage()).get()).toEqual({});
});

test('GenericStorage get', () => {
    const storage = {'foo': 123};
    const i = new GenericStorage(storage);
    expect(i.get()).toBe(storage);
    expect(i.get('foo')).toBe(123);
    expect(i.get('bar')).toBe(undefined);
    expect(i.get('bar', 234)).toBe(234);
});

test('GenericStorage set', () => {
    const i = new GenericStorage();
    expect(i.get('foo')).toBe(undefined);
    i.set('foo', 'bar');
    expect(i.get('foo')).toBe('bar');
    i.set(1, 'baz');
    expect(i.get(1)).toBe('baz');
    expect(i.get('1')).toBe('baz');
    expect(() => {
        // @ts-ignore
        i.set();
    }).toThrow();
    expect(() => {
        // @ts-ignore
        i.set('bar');
    }).toThrow();
});

test('GenericStorage has', () => {
    const i = new GenericStorage();
    expect(i.has('foo')).toBe(false);
    i.set('foo', 'bar');
    expect(i.has('foo')).toBe(true);
    expect(i.has('foo2')).toBe(false);
    i.set('foo2', 'baz');
    expect(i.has('foo')).toBe(true);
    expect(i.has('foo2')).toBe(true);
    expect(() => {
        // @ts-ignore
        i.has();
    }).toThrow();
});

test('GenericStorage remove', () => {
    const i = new GenericStorage();
    i.set('foo', 'bar');
    i.set('foo2', 'baz');
    expect(i.get('foo')).toBe('bar');
    expect(i.get('foo2')).toBe('baz');
    expect(i.remove('foo')).toBe(i);
    expect(i.remove('foo2')).toBe(i);
    expect(i.get()).toEqual({});
    expect(() => {
        // @ts-ignore
        i.remove();
    }).toThrow();
});

test('GenericStorage forEach', () => {
    const i = new GenericStorage({foo: 1, bar: 2});
    const e: Array<any> = [];
    i.forEach((v: any, k: any) => {
        e.push(k);
        e.push(v);
    });
    expect(e).toEqual(['foo', 1, 'bar', 2]);
});

test('GenericStorage forEach function bridge', () => {
    const i = new GenericStorage({foo: 1, bar: 2});
    const e: Array<any> = [];
    forEach(i, (v, k) => {
        e.push(k);
        e.push(v);
    });
    expect(e).toEqual(['foo', 1, 'bar', 2]);
});

test('GenericStorage onChange', () => {
    const s = {};
    let c = 0;
    const i = new GenericStorage(s);
    const callbackWildcard: GenericStorageWatcher = (_: any, _1: any, storage: any, key: any) => {
        c++;
        expect(key).toBe('foo');
        expect(storage).toBe(s);
    };
    
    i.watch('*', callbackWildcard);
    
    let callback: GenericStorageWatcher = (value: any, valueOld: any, storage: any, key: any) => {
        c++;
        expect(valueOld).toBe(undefined);
        expect(key).toBe('foo');
        expect(value).toBe('bar');
        expect(storage).toBe(s);
    };
    i.watch('foo', callback);
    i.set('foo', 'bar');
    i.unwatch('foo', callback);
    
    callback = (value: any, valueOld: any, storage: any, key: any) => {
        c++;
        expect(valueOld).toBe('bar');
        expect(key).toBe('foo');
        expect(value).toBe(undefined);
        expect(storage).toBe(s);
    };
    i.watch('foo', callback);
    i.remove('foo');
    i.unwatch('foo', callback);
    i.unwatch('*', callbackWildcard);
    
    i.set('bar', 'baz');
    
    expect(c).toBe(4);
});