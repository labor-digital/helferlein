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
 * Last modified: 2019.01.09 at 13:42
 */

import {forEach} from "../src/Lists/forEach";

test('forEach with array', () => {
	let array = [1,2,3];
	let c = 0;
	forEach(array, (v,k,o) => {
		expect(v).toBe(array[c]);
		expect(k).toBe(c);
		expect(o).toBe(array);
		c++;
	});
	expect(c).toBe(3);
});

test('forEach break with array', () => {
	let array = [1,2];
	forEach(array, (v,k,o) => {
		expect(v).toBe(1);
		return false;
	});
});

test('forEach with Map', () => {
	let map = new Map();
	map.set(0, 1);
	map.set(1, 2);
	map.set(2, 3);
	let c = 0;
	forEach(map, (v,k,o) => {
		expect(v).toBe(map.get(k));
		expect(k).toBe(c);
		expect(o).toBe(map);
		c++;
	});
	expect(c).toBe(3);
});

test('forEach break with Map', () => {
	let map = new Map();
	map.set(0, 1);
	map.set(1, 2);
	forEach(map, (v,k,o) => {
		expect(v).toBe(1);
		return false;
	});
});

test('forEach with Set', () => {
	let set = new Set();
	set.add(1);
	set.add(2);
	set.add(3);
	let c = 0;
	forEach(set, (v,k,o) => {
		expect(v).toBe(c + 1);
		expect(k).toBe(c);
		expect(o).toBe(set);
		c++;
	});
	expect(c).toBe(3);
});

test('forEach break with Set', () => {
	let set = new Set();
	set.add(1);
	set.add(2);
	forEach(set, (v,k,o) => {
		expect(v).toBe(1);
		return false;
	});
});

test('forEach with Object literal', () => {
	let map = {
		0:1,
		1:2,
		2:3
	};
	let c = 0;
	forEach(map, (v,k,o) => {
		expect(v).toBe(c + 1);
		// Object keys will be converted into strings, no matter what their orignal value was
		expect(k).toBe(c);
		expect(o).toBe(map);
		c++;
	});
	expect(c).toBe(3);
});

test('forEach break with Set', () => {
	let map = {
		0:1,
		1:2,
		2:3
	};
	forEach(map, (v,k,o) => {
		expect(v).toBe(1);
		return false;
	});
});