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

import {map} from "../src/Lists/map";

test('Map Array', () => {
	let array = [1,2,3,4];
	let c = 0;
	expect(map(array, (v, k, list) => {
		expect(v).toBe(c + 1);
		expect(k).toBe(c);
		expect(list).toBe(array);
		c++;
		return v + 1;
	})).toEqual([2,3,4,5]);
	expect(c).toBe(4);
	expect(array).toEqual([1,2,3,4]);
});

test('Map Object', () => {
	let object = {
		0: 1,
		1: 2,
		2: 3,
		3: 4
	};
	let c = 0;
	expect(map(object, (v, k, list) => {
		expect(v).toBe(c + 1);
		expect(k).toBe(c);
		expect(list).toBe(object);
		c++;
		return v + 1;
	})).toEqual({
		0: 2,
		1: 3,
		2: 4,
		3: 5
	});
	expect(c).toBe(4);
	expect(object).toEqual({
		0: 1,
		1: 2,
		2: 3,
		3: 4
	});
});

test('Map Set', () => {
	let object = new Set();
	object.add(1);
	object.add(2);
	object.add(3);
	object.add(4);

	let expectedResult = new Set();
	expectedResult.add(2);
	expectedResult.add(3);
	expectedResult.add(4);
	expectedResult.add(5);

	let expectedObject = new Set();
	expectedObject.add(1);
	expectedObject.add(2);
	expectedObject.add(3);
	expectedObject.add(4);

	let c = 0;
	expect(map(object, (v, k, list) => {
		expect(v).toBe(c + 1);
		expect(k).toBe(c);
		expect(list).toBe(object);
		c++;
		return v + 1;
	})).toEqual(expectedResult);

	expect(c).toBe(4);
	expect(object).toEqual(expectedObject);
});

test('Map Map', () => {
	let object = new Map();
	object.set(0,1);
	object.set(1,2);
	object.set(2,3);
	object.set(3,4);

	let expectedResult = new Map();
	expectedResult.set(0,2);
	expectedResult.set(1,3);
	expectedResult.set(2,4);
	expectedResult.set(3,5);

	let expectedObject = new Map();
	expectedObject.set(0,1);
	expectedObject.set(1,2);
	expectedObject.set(2,3);
	expectedObject.set(3,4);

	let c = 0;
	expect(map(object, (v, k, list) => {
		expect(v).toBe(c + 1);
		expect(k).toBe(c);
		expect(list).toBe(object);
		c++;
		return v + 1;
	})).toEqual(expectedResult);

	expect(c).toBe(4);
	expect(object).toEqual(expectedObject);
});