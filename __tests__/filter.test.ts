/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import {filter} from "../src/filter";

test("filter with array", () => {
	expect(filter([1, 2, 3, 4], (v) => {
		if (v < 2 || v > 3) return false;
	})).toEqual([2, 3]);
});

test("filter with set", () => {
	let list = new Set();
	list.add(1);
	list.add(2);
	list.add(3);
	list.add(4);
	
	let listExpected = new Set();
	listExpected.add(2);
	listExpected.add(3);
	expect(filter(list, (v) => {
		if (v < 2 || v > 3) return false;
	})).toEqual(listExpected);
});

test("filter with map", () => {
	let list = new Map();
	list.set("a", 1);
	list.set("aa", 2);
	list.set("aaa", 3);
	list.set("aaaa", 4);
	
	let listExpected = new Map();
	listExpected.set("aa", 2);
	listExpected.set("aaa", 3);
	expect(filter(list, (v) => {
		if (v < 2 || v > 3) return false;
	})).toEqual(listExpected);
});

test("filter with object", () => {
	let list = {
		a: 1,
		aa: 2,
		aaa: 3,
		aaaa: 4
	};
	
	let listExpected = {
		aa: 2,
		aaa: 3
	};
	expect(filter(list, (v) => {
		if (v < 2 || v > 3) return false;
	})).toEqual(listExpected);
});