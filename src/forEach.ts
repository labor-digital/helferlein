/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import {isSet} from "./isSet";
import {GenericObject} from "./Interfaces";


export interface ForEachCallbackType extends Function
{
	/**
	 * Is called for every element of the iterated object
	 * @param $value The current value as a jquery object
	 * @param value The current value
	 * @param key The current key
	 * @param iteratedObject The iterated object
	 */
	($value?: JQuery|any, key?, value?, iteratedObject?): void | boolean
}

export interface ForEachCallbackType extends Function
{
	/**
	 * Is called for every element of the iterated object
	 * @param value The current value
	 * @param key The current key
	 * @param iteratedObject The iterated object
	 */
	(value?:any, key?: string | number, iteratedObject?): void | boolean
}

interface BreakErrorType
{
	breaker?: boolean;
}

const breaker = new Error() as BreakErrorType;
breaker.breaker = true;

/**
 * Loops over arrays or objects and applies a given callback
 *
 * Will work with Arrays, Objects, Map, Set and jQuery objects.
 * If jQuery is used the callback params are: ($jQueryValue, key, value, iteratedObject)
 *
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key, iteratedObject)
 */
export function forEach(object: Array<any> | GenericObject | any, callback: ForEachCallbackType): void
{
	if (object === null || typeof object === "undefined") return;
	if (typeof object.forEach === "function")
	{
		const objectIsSet = isSet(object);
		try
		{
			let c = 0;
			object.forEach((v, k) => {
				if (callback(v, objectIsSet ? c : k, object) === false)
					throw breaker;
				++c;
			});
		} catch (e)
		{
			if (e.breaker === true) return;
			throw e;
		}
		return;
	}
	else if (typeof object.jquery !== "undefined")
	{
		//noinspection TypeScriptValidateTypes
		object.each((k, v) => !(callback(jQuery(v), k, v, object) === false));
		return;
	}
	else if (typeof object === "object" || typeof object === "function")
	{
		for (let k in object)
		{
			if (!object.hasOwnProperty(k)) continue;
			let kReal: string|number = k;
			if (parseInt(k) + "" === k) kReal = parseInt(k);
			if (callback(object[k], kReal, object) === false) break;
		}
		return;
	}

	throw Error("Could not iterate given object!");
}