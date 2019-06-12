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
 * Last modified: 2019.06.12 at 12:01
 */

import {_initPathWalkerStep, KeyTypes} from "../src/Lists/Paths/_internals";
import {getPath} from "../src/Lists/Paths/getPath";
import {hasPath} from "../src/Lists/Paths/hasPath";
import {mergePaths} from "../src/Lists/Paths/mergePaths";
import {parsePath} from "../src/Lists/Paths/parsePath";

const tree = {
	foo: "bar",
	bar: 123,
	baz: [
		123,
		234,
		[
			"foo",
			"bar"
		]
	],
	rumpel: {
		pumpel: {
			foo: "pumpFoo",
			bar: "pumpBar"
		},
		grumpel: 555,
		foo: 222
	},
	wild: [
		{
			foo: 123,
			horse: {
				carrot: 123,
				stick: 234,
				saddle: 345
			}
		},
		{
			foo: 234,
			horse: {
				carrot: 562,
				stick: 678,
				saddle: 903
			}
		}
	],
	wild2: [
		{foo: "asdf"},
		{foo: "bar"},
		{foo: "baz"}
	]
};


/**
 * MERGE PATHS
 */

test("mergePaths with strings", () => {
	expect(mergePaths("foo.bar", "bar.baz")).toEqual(["foo", "bar", "bar", "baz"]);
	expect(mergePaths("foo.bar.", "bar.baz")).toEqual(["foo", "bar", "bar", "baz"]);
});

test("mergePaths with strings and changed separators", () => {
	expect(mergePaths("foo,bar", "bar,baz", ",")).toEqual(["foo", "bar", "bar", "baz"]);
	expect(mergePaths("foo,bar", "bar-baz", ",", "-")).toEqual(["foo", "bar", "bar", "baz"]);
});

test("mergePaths with string and array", () => {
	expect(mergePaths("foo.bar", ["bar", "baz"])).toEqual(["foo", "bar", "bar", "baz"]);
	expect(mergePaths(["foo", "bar"], "bar.baz")).toEqual(["foo", "bar", "bar", "baz"]);
});

test("mergePaths with string and arrays", () => {
	expect(mergePaths(["foo", "bar"], ["bar", "baz"])).toEqual(["foo", "bar", "bar", "baz"]);
});


/**
 * PARSE PATH
 */
test("parsePath with number", () => {
	expect(parsePath(123)).toEqual(["123"]);
});


test("parsePath with string", () => {
	expect(parsePath("foo.bar.baz")).toEqual(["foo", "bar", "baz"]);
});

test("parsePath with cached string", () => {
	for (let i = 0; i < 5; i++)
		expect(parsePath("foo.bar.baz")).toEqual(["foo", "bar", "baz"]);
});

test("parsePath with string and dangling separator", () => {
	expect(parsePath("foo.bar.baz.")).toEqual(["foo", "bar", "baz"]);
});

test("parsePath with string and empty parts", () => {
	expect(parsePath("foo.bar..baz")).toEqual(["foo", "bar", "baz"]);
});

test("parsePath with string and separator", () => {
	expect(parsePath("foo-bar-baz", "-")).toEqual(["foo", "bar", "baz"]);
});

test("parsePath with string and escaped separator", () => {
	expect(parsePath("foo\\-bar-baz", "-")).toEqual(["foo-bar", "baz"]);
});

test("parsePath with string and sub selection", () => {
	expect(parsePath("foo.[bar,baz,foo]")).toEqual(["foo", ["bar", "baz", "foo"]]);
});

test("parsePath with string and specific sub selection", () => {
	expect(parsePath("foo.[bar,baz,foo.bar.baz]")).toEqual(["foo", ["bar", "baz", ["foo", "bar", "baz"]]]);
});

test("parsePath with string and nested sub selection", () => {
	expect(parsePath("foo.[bar,baz,foo.[bar,baz]]")).toEqual(["foo", ["bar", "baz", ["foo", ["bar", "baz"]]]]);
});


test("parsePath with array", () => {
	expect(parsePath(["foo", "bar", "baz", 123])).toEqual(["foo", "bar", "baz", "123"]);
});

test("parsePath with invalid array", () => {
	expect(() => {
		parsePath(["foo", () => {
		}, "baz"]);
	}).toThrowError();
});


/**
 * _INIT WALKER STEP
 */
test("_initPathWalkerStep of simple path", () => {
	const list = JSON.parse(JSON.stringify(tree));
	
	expect(_initPathWalkerStep(list, ["rumpel", "pumpel"])).toEqual([["rumpel"], false, KeyTypes.Default]);
	expect(_initPathWalkerStep(list, ["*", "pumpel"])).toEqual([["foo", "bar", "baz", "rumpel", "wild", "wild2"], false, KeyTypes.Wildcard]);
	expect(_initPathWalkerStep(list, [["baz", ["rumpel", "grumpel"], ["rumpel", "foo"]] as any, "pumpel"]))
		.toEqual([["baz", ["rumpel", "grumpel"], ["rumpel", "foo"]] as any, false, KeyTypes.Keys]);
});

/**
 * HAS PATH
 */
test("has simple path", () => {
	const list = JSON.parse(JSON.stringify(tree));
	expect(hasPath(list, "baz.2.1")).toEqual(true);
	expect(hasPath(list, "rumpel.pumpel.foo")).toEqual(true);
	expect(hasPath(list, "rumpel.pumpel.foo2")).toEqual(false);
	expect(hasPath(list, ["rumpel", "pumpel", "foo"])).toEqual(true);
	expect(hasPath(list, ["rumpel", "pumpel", "foo3"])).toEqual(false);
});

test("has wildcard path", () => {
	const list = JSON.parse(JSON.stringify(tree));
	expect(hasPath(list, "wild.*.foo")).toEqual(true);
	expect(hasPath(list, "rumpel.*.foo")).toEqual(false);
	expect(hasPath(list, ["rumpel", "pumpel", "foo"])).toEqual(true);
	expect(hasPath(list, "wild.*.horse.carrot")).toEqual(true);
});

test("has path with sub keys", () => {
	const list = JSON.parse(JSON.stringify(tree));
	expect(hasPath(list, "[foo,bar]")).toEqual(true);
	expect(hasPath(list, [["foo", "bar"]])).toEqual(true);
	expect(hasPath(list, [["foo", "bar", "foz"]])).toEqual(false);
	expect(hasPath(list, ["rumpel", ["pumpel", "grumpel"]])).toEqual(true);
	expect(hasPath(list, ["rumpel", [["pumpel", "foo"], "grumpel"]])).toEqual(true);
	expect(hasPath(list, "wild.*.horse.[carrot,saddle]")).toEqual(true);
	expect(hasPath(list, "wild.*.horse.[carrot,saddle,rose]")).toEqual(false);
	expect(hasPath(list, "[wild,wild2].*.foo")).toEqual(true);
});

/**
 * GET PATH
 */
test("get simple path", () => {
	const list = JSON.parse(JSON.stringify(tree));
	expect(getPath(list, "baz.2.1")).toEqual("bar");
	expect(getPath(list, "rumpel.pumpel.foo")).toEqual("pumpFoo");
	expect(getPath(list, "rumpel.pumpel.foo2")).toBeUndefined();
	expect(getPath(list, "rumpel.pumpel.foo2", false)).toEqual(false);
	expect(getPath(list, ["rumpel", "pumpel", "foo"])).toEqual(("pumpFoo"));
	expect(getPath(list, ["rumpel", "pumpel", "foo3"])).toBeUndefined();
});

test("get wildcard path", () => {
	const list = JSON.parse(JSON.stringify(tree));
	expect(getPath(list, "wild.*.foo")).toEqual([123, 234]);
	expect(getPath(list, "rumpel.*.foo", 1)).toEqual({pumpel: "pumpFoo", foo: 1, grumpel: 1});
	expect(getPath(list, ["rumpel", "pumpel", "foo"])).toEqual("pumpFoo");
	expect(getPath(list, "wild.*.horse.carrot")).toEqual([123, 562]);
	expect(getPath(list, "wild.*.horse.*")).toEqual([
		{
			"carrot": 123,
			"saddle": 345,
			"stick": 234
		},
		{
			"carrot": 562,
			"saddle": 903,
			"stick": 678
		}]);
});

test("get path with sub keys", () => {
	const list = JSON.parse(JSON.stringify(tree));
	expect(getPath(list, "[foo,bar]")).toEqual({bar: 123, foo: "bar"});
	expect(getPath(list, [["foo", "bar"]])).toEqual({bar: 123, foo: "bar"});
	expect(getPath(list, [["foo", "bar", "foz"]])).toEqual({bar: 123, foo: "bar", foz: undefined});
	
	// Those should all lead to the same result
	let res = {
		grumpel: 555,
		pumpel: {foo: "pumpFoo", bar: "pumpBar"}
	};
	expect(getPath(list, ["rumpel", ["pumpel", "grumpel"]])).toEqual(res);
	expect(getPath(list, "rumpel.[grumpel,pumpel.foo,pumpel.bar]")).toEqual(res);
	expect(getPath(list, "rumpel.[grumpel,pumpel.*]")).toEqual(res);
	expect(getPath(list, "rumpel.[grumpel,pumpel.[foo,bar]]")).toEqual(res);
	
	expect(getPath(list, ["rumpel", [["pumpel", "foo"], "grumpel"]])).toEqual({grumpel: 555, pumpel: {foo: "pumpFoo"}});
	expect(getPath(list, "wild.*.horse.[carrot,saddle]")).toEqual([
		{"carrot": 123, "saddle": 345}, {"carrot": 562, "saddle": 903}]);
	expect(getPath(list, "wild.*.horse.[carrot,saddle,rose]")).toEqual([
		{"carrot": 123, "rose": undefined, "saddle": 345}, {"carrot": 562, "rose": undefined, "saddle": 903}]);
	expect(getPath(list, "[wild,wild2].*.foo")).toEqual({"wild": [123, 234], "wild2": ["asdf", "bar", "baz"]});
});