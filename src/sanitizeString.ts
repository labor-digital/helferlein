/**
 * Created by Martin Neundorfer on 08.11.2018.
 * For LABOR.digital
 */
/**
 * Removes all non alpha numerical chars from the given string and returns it.
 * Also keeps - _ and /
 * @param string
 */
export function sanitizeString(string:string):string {
	if(typeof string !== "string") return "";
	return string.replace(/[^a-zA-Z\-_/0-9]/g, "");
}