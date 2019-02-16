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
import {isNumber} from "../src/Types/isNumber";

test("isNumber", () => {
	expect(isNumber([])).toBe(false);
	expect(isNumber([123,2345,35464, "asdf"])).toBe(false);
	expect(isNumber({})).toBe(false);
	expect(isNumber({"a": "b"})).toBe(false);
	expect(isNumber(undefined)).toBe(false);
	expect(isNumber(null)).toBe(false);
	expect(isNumber("string")).toBe(false);
	expect(isNumber(123)).toBe(true);
	expect(isNumber(123.12)).toBe(true);
	expect(isNumber(NaN)).toBe(false);
});