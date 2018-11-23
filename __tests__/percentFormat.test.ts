/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {numberAsPercent} from "../src/formatAndConvert/numberAsPercent";
import {percentAsNumber} from "../src/formatAndConvert/percentAsNumber";

test("numberAsPercent", () => {
	expect(numberAsPercent(1)).toBe("100,00");
	expect(numberAsPercent(1, true)).toBe("100");
	expect(numberAsPercent(100)).toBe("10.000,00");
	expect(numberAsPercent(0.3333333)).toBe("33,33");
});

test("percentAsNumber", () => {
	expect(percentAsNumber("100,00")).toBe(1);
	expect(percentAsNumber("100")).toBe(1);
	expect(percentAsNumber("10.000,00")).toBe(100);
	expect(percentAsNumber("10.000")).toBe(100);
	expect(percentAsNumber("10,000")).toBe(100);
	expect(percentAsNumber("33,33")).toBe(0.3333);
});