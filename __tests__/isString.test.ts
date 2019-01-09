/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {isString} from "../src/Types/isString";

test("isString", () => {
	expect(isString([])).toBe(false);
	expect(isString([123,2345,35464, "asdf"])).toBe(false);
	expect(isString({})).toBe(false);
	expect(isString({"a": "b"})).toBe(false);
	expect(isString(undefined)).toBe(false);
	expect(isString(null)).toBe(false);
	expect(isString("string")).toBe(true);
	expect(isString(123)).toBe(false);
	expect(isString(123.12)).toBe(false);
});