/**
 * Created by Martin Neundorfer on 24.01.2019.
 * For LABOR.digital
 */
import {isString} from "../Types/isString";
import {forEach} from "../Lists/forEach";

/**
 * This helper is used to cut a string to a fixed number of characters.
 * The resulting string will not exceed the given limit but will also respect
 * word boundraries, not cutting words in half.
 *
 * By default ellipsis will be added at the end of a string which was cut. To
 * disable this, set the third parameter to be an empty string
 *
 * @param value The value to limit to a given number of characters
 * @param limit The number of characters
 * @param ellipsis Optional: Used to override the ... added to a cut of string
 */
export function maxLength(value:string, limit:number, ellipsis?:string):string {
	if(!isString(ellipsis)) ellipsis = "...";
	const words = value.trim().split(" ");
	let length = 0;
	let result = [];
	forEach(words, word => {
		if((length += word.length) >= limit) return false;
		result.push(word);
	});
	let string = result.join(" ");
	if(words.length !== result.length) string += ellipsis;
	return string;
}