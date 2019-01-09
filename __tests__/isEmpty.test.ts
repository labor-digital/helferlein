/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
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
	expect(isEmpty(0)).toBe(true);
	expect(isEmpty(123)).toBe(false);
	expect(isEmpty(123.12)).toBe(false);
});