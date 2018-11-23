/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import {asArray} from "../src/formatAndConvert/asArray";

test('asArray with Object', () => {
	expect(asArray({'a': 1, 'b': 2, 'd': 3, 'e': 'asdf'})).toEqual([1,2,3,'asdf']);
});

test('asArray with Array', () => {
	expect(asArray([1,2,3,'asdf'])).toEqual([1,2,3,'asdf']);
});

test('asArray with Set', () => {
	let list = new Set();
	list.add(1);
	list.add(2);
	list.add(3);
	list.add('asdf');
	expect(asArray(list)).toEqual([1,2,3,'asdf']);
});

test('asArray with Map', () => {
	let list = new Map();
	list.set('a',1);
	list.set('aa',2);
	list.set('aaa',3);
	list.set('aaaa','asdf');
	expect(asArray(list)).toEqual([1,2,3,'asdf']);
});

test('asArray empty array with null or undefined', () => {
	expect(asArray(null)).toEqual([]);
	expect(asArray(undefined)).toEqual([]);
});

test('asArray to die if a non-iterable object was given', () => {
	expect(() => {
		asArray(true)
	}).toThrow();
});