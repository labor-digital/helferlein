/**
 * Created by Martin Neundorfer on 08.11.2018.
 * For LABOR.digital
 */
/**
 * Receives a string, trims it and sets the first char to uppercase
 * @param value
 */
export function ucFirst(value:string):string {
	if(typeof value !== "string") return "";
	value = value.trim();
	return value.charAt(0).toUpperCase() + value.substr(1)
}