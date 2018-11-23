import {map} from "../src/iteration/map";

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