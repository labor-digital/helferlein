/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import {isArray} from "./types/isArray";
import {GenericObject} from "./Interfaces";

/**
 * This is the lightwight brother of mergeRecursive.
 * It will only merge arrays and generic objects. It will also only merge
 * elements with the same type, meaning objects with objects and arrays with arrays.
 * If an error occured the method will return false
 *
 * @param args
 */
export function merge(...args):Array<any>|GenericObject|boolean {
	if(args.length === 0) return false;
	let result:any = null;
	let currentType:string = "";
	for(var i = 0; i < args.length; i++){
		const arg = args[i];
		let type = isArray(arg) ? "a" : (jQuery.isPlainObject(arg) ? "o" : "");
		if(type === "") return false;

		// Check if this is the first element
		if(i === 0){
			result = arg;
			currentType = type;
			continue;
		}
		if(currentType !== type) return false;

		// Merge
		switch (type) {
			case "a":
				result = result.concat(arg);
				break;
			case "o":
				result = jQuery.extend(result, arg);
				break;
		}
	}
	// Done
	return result;
}