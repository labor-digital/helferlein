/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {isArray} from "../src/Types/isArray";

test("isArray", () => {
	expect(isArray([])).toBe(true);
	expect(isArray([123,2345,35464, "asdf"])).toBe(true);
	expect(isArray({})).toBe(false);
	expect(isArray({"a": "b"})).toBe(false);
	expect(isArray(undefined)).toBe(false);
	expect(isArray(null)).toBe(false);
	expect(isArray("string")).toBe(false);
	expect(isArray(123)).toBe(false);
	expect(isArray(123.12)).toBe(false);
});