/**
 * Created by Martin Neundorfer on 10.01.2019.
 * For LABOR.digital
 */
import {isUndefined} from "../Types/isUndefined";
import {PlainObject} from "../Interfaces/PlainObject";
import {isString} from "../Types/isString";
import {GenericStorage} from "../Entities/GenericStorage";

declare global {
	interface Window {
		HELFERLEIN_GLOBAL_STORAGE?:PlainObject
	}
}

/**
 * Provides access to a global storage object on the window scope. Means multiple libraries may interact
 * with the storage and each other.
 *
 * The storage will hold a list of GenericStorage objects.
 *
 * @param namespace
 */
export function globalStorage(namespace?:string):GenericStorage {
	if(isUndefined(window.HELFERLEIN_GLOBAL_STORAGE))
		window.HELFERLEIN_GLOBAL_STORAGE = {};
	if(!isString(namespace)) namespace = "storage-" + (Math.random() + "").replace(/[^0-9]/g, "");
	if(isUndefined(window.HELFERLEIN_GLOBAL_STORAGE[namespace]))
		window.HELFERLEIN_GLOBAL_STORAGE[namespace] = new GenericStorage();
	return window.HELFERLEIN_GLOBAL_STORAGE[namespace];
}