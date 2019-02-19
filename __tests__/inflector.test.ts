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
 * Last modified: 2019.02.17 at 16:41
 */
import {inflectToArray} from "../src/Strings/Inflector/inflectToArray";
import {inflectToCamelBack} from "../src/Strings/Inflector/inflectToCamelBack";
import {inflectToCamelCase} from "../src/Strings/Inflector/inflectToCamelCase";
import {inflectToDashed} from "../src/Strings/Inflector/inflectToDashed";
import {inflectToSlug} from "../src/Strings/Inflector/inflectToSlug";
import {inflectToHuman, inflectToSpacedUpper} from "../src/Strings/Inflector/inflectToSpacedUpper";
import {inflectToUnderscore} from "../src/Strings/Inflector/inflectToUnderscore";

const inputs = [
	"fooBarBaz", "foo bar baz", "foo-bar-baz", "foo--bar---baz",
	"foo_bar_baz", "foo-bar_baz fooBar", "foo1Asdf", "foobarbaz",
	"FOOBarBAZ", "FOObarBaz", "asdf123bar", "foo1Bar"
];

test("inflectToArray default", () => {
	const results = [["foo", "bar", "baz"], ["foo", "bar", "baz"], ["foo", "bar", "baz"], ["foo", "bar", "baz"], ["foo", "bar", "baz"],
		["foo", "bar", "baz", "foo", "bar"], ["foo", "1", "asdf"], ["foobarbaz"], ["f", "o", "o", "bar", "b", "a", "z"],
		["f", "o", "obar", "baz"], ["asdf", "123", "bar"], ["foo", "1", "bar"]];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToArray(input)).toEqual(result);
	}
});

test("inflectToArray intelligent", () => {
	const results = [["foo", "bar", "baz"], ["foo", "bar", "baz"], ["foo", "bar", "baz"], ["foo", "bar", "baz"], ["foo", "bar", "baz"],
		["foo", "bar", "baz", "foo", "bar"], ["foo", "1", "asdf"], ["foobarbaz"], ["foo", "bar", "baz"],
		["fo", "obar", "baz"], ["asdf", "123", "bar"], ["foo", "1", "bar"]];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToArray(input, true)).toEqual(result);
	}
});

test("inflectToSpacedUpper", () => {
	const results = ["Foo Bar Baz", "Foo Bar Baz", "Foo Bar Baz", "Foo Bar Baz", "Foo Bar Baz", "Foo Bar Baz Foo Bar",
		"Foo 1 Asdf", "Foobarbaz",  "F O O Bar B A Z", "F O Obar Baz", "Asdf 123 Bar", "Foo 1 Bar"];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToSpacedUpper(input)).toEqual(result);
		expect(inflectToHuman(input)).toEqual(result);
	}
});

test("inflectToCamelCase", () => {
	const results = ["FooBarBaz", "FooBarBaz", "FooBarBaz", "FooBarBaz", "FooBarBaz", "FooBarBazFooBar",
		"Foo1Asdf", "Foobarbaz",  "FOOBarBAZ", "FOObarBaz", "Asdf123Bar", "Foo1Bar"];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToCamelCase(input)).toEqual(result);
	}
});

test("inflectToCamelBack", () => {
	const results = ["fooBarBaz", "fooBarBaz", "fooBarBaz", "fooBarBaz", "fooBarBaz", "fooBarBazFooBar",
		"foo1Asdf", "foobarbaz",  "fOOBarBAZ", "fOObarBaz", "asdf123Bar", "foo1Bar"];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToCamelBack(input)).toEqual(result);
	}
});

test("inflectToDashed", () => {
	const results = ["foo-bar-baz", "foo-bar-baz", "foo-bar-baz", "foo-bar-baz", "foo-bar-baz", "foo-bar-baz-foo-bar",
		"foo-1-asdf", "foobarbaz",  "f-o-o-bar-b-a-z", "f-o-obar-baz", "asdf-123-bar", "foo-1-bar"];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToDashed(input)).toEqual(result);
	}
});

test("inflectToUnderscore", () => {
	const results = ["foo_bar_baz", "foo_bar_baz", "foo_bar_baz", "foo_bar_baz", "foo_bar_baz", "foo_bar_baz_foo_bar",
		"foo_1_asdf", "foobarbaz",  "f_o_o_bar_b_a_z", "f_o_obar_baz", "asdf_123_bar", "foo_1_bar"];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToUnderscore(input)).toEqual(result);
	}
});

test("inflectToSlug", () => {
	const results = ["foo-bar-baz", "foo-bar-baz", "foo-bar-baz", "foo-bar-baz", "foo-bar-baz", "foo-bar-baz-foo-bar",
		"foo-1-asdf", "foobarbaz",  "f-o-o-bar-b-a-z", "f-o-obar-baz", "asdf-123-bar", "foo-1-bar"];

	for(var i = 0; i < inputs.length; i++){
		const input = inputs[i];
		const result = results[i];
		expect(inflectToSlug(input)).toEqual(result);
	}

	const additionalInputs = ["föö-bär-böz", "nöMitÖUnd_Rächen", "bewölkt"];
	const additionalResults = ["foeoe-baer-boez", "noe-mit-oe-und-raechen", "bewoelkt"];

	for(var i = 0; i < additionalInputs.length; i++){
		const input = additionalInputs[i];
		const result = additionalResults[i];
		expect(inflectToSlug(input)).toEqual(result);
	}
});