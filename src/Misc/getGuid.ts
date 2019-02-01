/**
 * Created by Martin Neundorfer on 01.02.2019.
 * For LABOR.digital
 */
import {isString} from "../Types/isString";

let guid = 0;

/**
 * Returns a globally unique, numeric id as a string
 * @param prefix
 */
export function getGuid(prefix?:string):string {
	return (isString(prefix) ? prefix : "") + guid++
}