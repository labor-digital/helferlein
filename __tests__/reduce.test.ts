import {reduce} from "../src/iteration/reduce";

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
		reduce(true, (current, value, key, list) => {}, 0);
	}).toThrow();
});