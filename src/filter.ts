/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */

import IterableHelpers from "./IterableHelpers";
import {forEach} from "./forEach";
import {ForEachCallbackType} from "./forEach";

export interface FilterCallback extends ForEachCallbackType
{
}

export function filter(object, callback: FilterCallback): any
{
	let outputType = IterableHelpers.getElementType(object);
	if (outputType === null) throw new Error("Could not determine the output type of a given element!");
	let output = IterableHelpers.getNewElement(outputType);
	
	forEach(object, (v, k) => {
		if(callback(v, k, object) === false) return;
		IterableHelpers.genericSet(outputType, output, k, v, false);
	});
	
	return output;
}