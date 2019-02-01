/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {isArray} from "./isArray";
import {isMap} from "./isMap";
import {isSet} from "./isSet";
import {isPlainObject} from "./isPlainObject";

/**
 * Returns true if the given value counts as empty
 * Empty values are: NULL, undefined, 0, "", " ", {}, [] and empty Maps and Sets
 * @param value
 * @param includeZero By default zero (0) is not seen as "empty" if you set this to true, it will be, tho
 */
export function isEmpty(value, includeZero?:boolean):boolean {
	if(value === null) return true;
	switch (typeof value) {
		case "undefined":
			return true;
		case "string":
			return value.trim().length === 0 || includeZero === true && value === "0";
		case "number":
			return includeZero === true ? value === 0 : false;
		case "object":
			if(isPlainObject(value)) return Object.keys(value).length === 0;
			if(isArray(value)) return value.length === 0;
			if(isMap(value) || isSet(value)) return value.size === 0;
	}
	return false;
}