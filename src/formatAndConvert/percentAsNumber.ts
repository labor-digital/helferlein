/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {moneyAsNumber} from "./moneyAsNumber";

/**
 * Converts a given value like 1,4 or 12.60 into their numeric representation as float: 0.014 and 0.1260
 * @param value
 */
export function percentAsNumber(value:string):number {
	const num = moneyAsNumber(value);
	return Math.abs(num) / 100;
}