/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {moneyAsNumber} from "../src/formatAndConvert/moneyAsNumber";
import {numberAsMoney} from "../src/formatAndConvert/numberAsMoney";

test("moneyAsNumber", () => {
	expect(moneyAsNumber("1.000.000")).toBe(1000000);
	expect(moneyAsNumber("1.000.000,00")).toBe(1000000);
	expect(moneyAsNumber("1,000,000.00")).toBe(1000000);
	expect(moneyAsNumber("1,000,000")).toBe(1000000);
	expect(moneyAsNumber("1,000,000.0000000000001")).toBe(1000000);
	expect(moneyAsNumber("1.000.000,0000000000001")).toBe(1000000);
	expect(moneyAsNumber("1,5")).toBe(1.5);
	expect(moneyAsNumber("1,50")).toBe(1.5);
	expect(moneyAsNumber("10.5")).toBe(10.5);
	expect(moneyAsNumber("10.50")).toBe(10.5);
	// Test if invalid values will propperly handled
	let tmp:any = 1.5;
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
	let tmp:any = "foo";
	expect(numberAsMoney(tmp)).toBe("ERR");
	tmp = "1.5";
	expect(numberAsMoney(tmp)).toBe("1,50");
	tmp = null;
	expect(numberAsMoney(tmp)).toBe("ERR");
	tmp = undefined;
	expect(numberAsMoney(tmp)).toBe("ERR");
});