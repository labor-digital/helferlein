/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
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