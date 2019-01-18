/**
 * Created by Martin Neundorfer on 17.01.2019.
 * For LABOR.digital
 */
import {isUndefined} from "../Types/isUndefined";
import {isFunction} from "../Types/isFunction";
import {isString} from "../Types/isString";
import {isArray} from "../Types/isArray";

interface FormateDateAndTimeResolver {
	(val: number): string;
}

export interface ConfigureFormatDateAndTimeOptions {
	/**
	 * The list of all month names (Has to be 12 entries or a valid resolver)
	 */
	monthNames: string | Array<string> | FormateDateAndTimeResolver;

	/**
	 * The list of all month abbreviations (Has to be 12 entries or a valid resolver)
	 */
	monthNamesAbbr: string | Array<string> | FormateDateAndTimeResolver;

	/**
	 * The names of all week days, starting with monday (Has to be 7 entries or a valid resolver)
	 */
	weekDays: string | Array<string> | FormateDateAndTimeResolver;

	/**
	 * The names of all week days, starting with monday (Has to be 7 entries or a valid resolver)
	 */
	weekDaysAbbr: string | Array<string> | FormateDateAndTimeResolver;
}

class FormatDateAndTimeConfig implements ConfigureFormatDateAndTimeOptions {
	/**
	 * The list of all month names (Has to be 12 entries or a valid resolver)
	 */
	monthNames: Array<string> | FormateDateAndTimeResolver;

	/**
	 * The list of all month abbreviations (Has to be 12 entries or a valid resolver)
	 */
	monthNamesAbbr: Array<string> | FormateDateAndTimeResolver;

	/**
	 * The names of all week days, starting with monday (Has to be 7 entries or a valid resolver)
	 */
	weekDays: Array<string> | FormateDateAndTimeResolver;

	/**
	 * The names of all week days, starting with monday (Has to be 7 entries or a valid resolver)
	 */
	weekDaysAbbr: Array<string> | FormateDateAndTimeResolver;

	constructor() {
		this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		this.monthNamesAbbr = this.monthNames.map(v => v.substr(0, 3));
		this.weekDaysAbbr = this.weekDays.map(v => v.substr(0, 2));
	}

	setVal(key: "monthNames" | "monthNamesAbbr" | "weekDays" | "weekDaysAbbr", value: string | Array<string> | FormateDateAndTimeResolver, argLength: number) {
		if (isUndefined(this[key])) throw new Error("Invalid key \"" + key + "\" given!");
		if (isString(value)) value = (value as string).split(",");
		if (isArray(value)){
			if((value as Array<string>).length !== argLength)
				throw new Error("Invalid length for: " + key + " there are " + argLength + " elements required");
		}
		else if (!isFunction(value)) throw new Error("Invalid value for " + key + " given!");
		this[key] = value as any;
	}

	getVal(key: "monthNames" | "monthNamesAbbr" | "weekDays" | "weekDaysAbbr", index: number): string {
		if (isFunction(this[key])) return (this[key] as FormateDateAndTimeResolver)(index);
		return (this[key] as Array<string>)[index];
	}
}

// Create config instance
const config = new FormatDateAndTimeConfig();

/**
 * Can be used to configure the localization.
 * The configuration can either be done by supplying a js object, or by setting a string containing the format,
 * which is especially useful, because you only have to supply a single translation value from your backend.
 * The string should be formatted as a 4 comma separated lists that are separated by pipe characters.
 * example: monthNames,monthNames...|monthNamesAbbr,monthNamesAbbr...|weekDays,weekDays...|weekDaysAbbr,weekDaysAbbr...
 *
 * @param format
 */
export function configureFormatDateAndTime(format: string | ConfigureFormatDateAndTimeOptions) {
	if (isString(format)) {
		const fp = (format as string).split("|");
		if (fp.length !== 4) throw new Error("Invalit dateAndTime config! If a string is given, it is expected to receive FOUR parts separated via '|' (pipe) character.");
		format = {monthNames: fp[0], monthNamesAbbr: fp[1], weekDays: fp[2], weekDaysAbbr: fp[3]};
	}
	console.log((format as any).monthNames);
	if (!isUndefined((format as any).monthNames)) config.setVal("monthNames", (format as any).monthNames, 12);
	if (!isUndefined((format as any).monthNamesAbbr)) config.setVal("monthNamesAbbr", (format as any).monthNamesAbbr, 12);
	if (!isUndefined((format as any).weekDays)) config.setVal("weekDays", (format as any).weekDays, 7);
	if (!isUndefined((format as any).weekDaysAbbr)) config.setVal("weekDaysAbbr", (format as any).weekDaysAbbr, 7);
}

/**
 * Returns an array containing the list of all valued for the required type
 * @param type
 */
export function getDateAndTimeFormat(type: "monthNames" | "monthNamesAbbr" | "weekDays" | "weekDaysAbbr"):Array<string> {
	if(isFunction(config[type])){
		const length = type.charAt(0) === "m" ? 12 : 7;
		const result = [];
		for(let i = 0; i < length; i++)
			result.push((config[type] as FormateDateAndTimeResolver)(i));
		return result;
	}
	return (config[type] as Array<string>);
}

/**
 * This is a small implementation of the date formater which is used in php
 * The format string can use the same modifiers as in the documentation.
 *
 * Currently supported are:
 * d    Day of the month, 2 digits with leading zeros    01 to 31
 * D    A textual representation of a day, three letters    Mon through Sun
 * j    Day of the month without leading zeros    1 to 31
 * l    A full textual representation of the day of the week    Sunday through Saturday
 * w    Numeric representation of the day of the week    0 (for Sunday) through 6 (for Saturday)
 * n    Numeric representation of a month, without leading zeros    1 through 12
 * F    A full textual representation of a month, such as January or March    January through December
 * m    Numeric representation of a month, with leading zeros    01 through 12
 * M    A short textual representation of a month, three letters    Jan through Dec
 * G    24-hour format of an hour without leading zeros    0 through 23
 * H    24-hour format of an hour with leading zeros    00 through 23
 * i    Minutes with leading zeros    00 to 59
 * s    Seconds, with leading zeros    00 through 59
 *
 * @param format
 * @param date
 */
export function formatDateAndTime(format: string, date?: Date) {
	if (isUndefined(date)) date = new Date();
	return format.replace(/(?:\\.)|([YydjwnlDFmMHisG])/g, (a, b) => {
		if (isUndefined(b)) return a.charAt(0) === "\\" ? a.substr(1) : a;
		if (b === "H") return date.getHours() >= 10 ? date.getHours() + "" : "0" + date.getHours();
		if (b === "G") return date.getHours() + "";
		if (b === "i") return date.getMinutes() >= 10 ? date.getMinutes() + "" : "0" + date.getMinutes();
		if (b === "s") return date.getSeconds() >= 10 ? date.getSeconds() + "" : "0" + date.getSeconds();
		if (b === "Y") return date.getFullYear() + "";
		if (b === "y") return (date.getFullYear() + "").substr(2, 2);
		if (b === "d") return date.getDate() >= 10 ? date.getDate() + "" : "0" + date.getDate();
		if (b === "l") return config.getVal("weekDays", date.getDay());
		if (b === "j") return date.getDate() + "";
		if (b === "w") return date.getDay() + "";
		if (b === "n") return (date.getDay() + 1) + "";
		if (b === "D") return config.getVal("weekDaysAbbr", date.getDay());
		if (b === "F") return config.getVal("monthNames", date.getMonth());
		if (b === "m") return (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) + "" : "0" + (date.getMonth() + 1);
		if (b === "M") return config.getVal("monthNamesAbbr", date.getMonth());
		console.error("Invalid date formatter: " + b);
		return "";
	});
}