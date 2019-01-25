/**
 * Created by Martin Neundorfer on 22.01.2019.
 * For LABOR.digital
 */
import {isString} from "../Types/isString";

/**
 * Takes a file size in bytes and formats it into a human readable file size string
 * The basic implementation is from: https://stackoverflow.com/a/20732091
 * @param input
 */
export function numberAsFileSize(input: number | string): string {
	let inputNumber: number = isString(input) ? parseInt(input as string) : input as number;
	if (inputNumber === 0) return "";
	const i: number = Math.floor(Math.log(inputNumber) / Math.log(1024));
	return (inputNumber / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
}