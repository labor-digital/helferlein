/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {merge} from "../src/merge";

// @ts-ignore
const {JSDOM} = require("jsdom");
const myJSDom = new JSDOM("<html>");
// @ts-ignore
const jQuery = require("jquery")(myJSDom.window);
// @ts-ignore
global.jQuery = jQuery;


test("Simple array merge", () => {
	expect(merge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
});

test("Simple multi array merge", () => {
	expect(merge([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});

test("Recursive array merge", () => {
	expect(merge([1, [2, 3]], [6, [4, 5], 7])).toEqual([1, [2, 3], 6, [4, 5], 7]);
});

test("Simple object merge", () => {
	expect(merge({
		a: 1,
		b: 2
	}, {
		b: 5,
		c: 3,
		d: 4
	})).toEqual({
		a: 1,
		b: 5,
		c: 3,
		d: 4
	});
});