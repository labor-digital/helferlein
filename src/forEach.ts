/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
interface forEachCallbackType extends Function{
	/**
	 * Is called for every element of the iterated object
	 * @param value The current value
	 * @param key The current key
	 * @param iteratedObject The iterated object
	 */
	(value?, key?:string|number, iteratedObject?):void|false
}

interface forEachCallbackType extends Function{
	/**
	 * Is called for every element of the iterated object
	 * @param $value The current value as a jquery object
	 * @param value The current value
	 * @param key The current key
	 * @param iteratedObject The iterated object
	 */
	($value?, key?, value?, iteratedObject?):void|false
}

/**
 * Loops over arrays or objects and applies a given callback
 * Does also work with jquery objects
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 */
export function forEach(object: Array<any> | { [key: string]: any } | any, callback: forEachCallbackType): void {
	if (object === null || typeof object === 'undefined') return;
	if (Array.isArray(object)) {
		for (const k in object) {
			const v = object[k];
			if (callback(v, k, object) === false) break;
		}
	}
	else if (typeof object.jquery !== 'undefined') {
		object.each((k, v) => !(callback($(v), k, v, object) === false));
	}
	else if (typeof object.forEach === 'function') {
		try {
			object.forEach((v,k) => {
				if (callback(v, k, object) === false)
					throw new Error('BREAK');
			});
		} catch (e) {
			if(e.toString() === 'BREAK') return;
			throw e;
		}
	}
	else {
		for (const k in object) {
			if (!object.hasOwnProperty(k)) continue;
			const v = object[k];
			if (callback(v, k, object) === false) break;
		}
	}
}