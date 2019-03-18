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
import {isEmpty} from "../src/Types/isEmpty";

test("isEmpty", () => {
	expect(isEmpty([])).toBe(true);
	expect(isEmpty([123, 2345, 35464, "asdf"])).toBe(false);
	expect(isEmpty({})).toBe(true);
	expect(isEmpty({"a": "b"})).toBe(false);
	expect(isEmpty(undefined)).toBe(true);
	expect(isEmpty(null)).toBe(true);
	expect(isEmpty("string")).toBe(false);
	expect(isEmpty("")).toBe(true);
	expect(isEmpty(0)).toBe(false);
	expect(isEmpty(0, true)).toBe(true);
	expect(isEmpty(123)).toBe(false);
	expect(isEmpty(123.12)).toBe(false);
});