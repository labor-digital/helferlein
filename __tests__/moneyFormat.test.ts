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
 * Last modified: 2019.01.09 at 15:06
 */
import {moneyAsNumber} from "../src/FormatAndConvert/moneyAsNumber";
import {numberAsMoney} from "../src/FormatAndConvert/numberAsMoney";

test("moneyAsNumber", () => {
	expect(moneyAsNumber("1.000.000")).toBe(1000000);
	expect(moneyAsNumber("98000.00000000003")).toBe(98000.00000000003);
	expect(moneyAsNumber("1.000.000,00")).toBe(1000000);
	expect(moneyAsNumber("1,000,000.00")).toBe(1000000);
	expect(moneyAsNumber("1,000,000")).toBe(1000000);
	expect(moneyAsNumber("1,000,000.0000000000001")).toBe(1000000);
	expect(moneyAsNumber("1.000.000,0000000000001")).toBe(1000000);
	expect(moneyAsNumber("1,5")).toBe(1.5);
	expect(moneyAsNumber("1,50")).toBe(1.5);
	expect(moneyAsNumber("10.5")).toBe(10.5);
	expect(moneyAsNumber("10.50")).toBe(10.5);
	expect(moneyAsNumber("10,5")).toBe(10.5);
	expect(moneyAsNumber("10,")).toBe(10);
	expect(moneyAsNumber("1240.")).toBe(1240);
	expect(moneyAsNumber(".5")).toBe(0.5);
	// Test if invalid values will propperly handled
	let tmp: any = 1.5;
	expect(moneyAsNumber(tmp)).toBe(1.5);
	tmp = null;
	expect(moneyAsNumber(tmp)).toBe(-1);
	tmp = undefined;
	expect(moneyAsNumber(tmp)).toBe(-1);
});

test("numberAsMoney", () => {
	expect(numberAsMoney(1)).toBe("1,00");
	expect(numberAsMoney(100)).toBe("100,00");
	expect(numberAsMoney(1000)).toBe("1.000,00");
	expect(numberAsMoney(1000, true)).toBe("1.000");
	expect(numberAsMoney(1, true)).toBe("1");
	// Test if invalid values will propperly handled
	let tmp: any = "foo";
	expect(numberAsMoney(tmp)).toBe("ERR");
	tmp = "1.5";
	expect(numberAsMoney(tmp)).toBe("1,50");
	tmp = null;
	expect(numberAsMoney(tmp)).toBe("ERR");
	tmp = undefined;
	expect(numberAsMoney(tmp)).toBe("ERR");
});