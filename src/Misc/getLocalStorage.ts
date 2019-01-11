/**
 * Created by Martin Neundorfer on 11.01.2019.
 * For LABOR.digital
 */
import {isUndefined} from "../Types/isUndefined";
import {GenericStorage} from "../Entities/GenericStorage";
import {isString} from "../Types/isString";
import {getPageStorage} from "./getPageStorage";

/**
 * Adapter to connect a GenericStorage object to the window.localStorage API.
 * You may create multiple localStorage links using different namespaces.
 *
 * Keep in mind that everything you store in the GenericStorage object will be put into
 * a JSON object when it is stored in the browser's localStorage; so you can not store object instances in it.
 *
 * @param namespace
 */
export function getLocalStorage(namespace?:string): GenericStorage{
	if(isUndefined(window.localStorage)){
		console.error("Your browser does not support the localStorage API!");
		return new GenericStorage();
	}
	if(!isString(namespace)) namespace = "general";
	namespace = "helferlein." + namespace;

	// Check if there is already a connected instance on the page
	const localStorageRegistry = getPageStorage("@localStorage");
	if(localStorageRegistry.has(namespace)) return localStorageRegistry.get(namespace);

	// Read storage from window storage
	const s = window.localStorage.getItem(namespace);
	const storage = isString(s) ? JSON.parse(s) : {};

	// Create storage object
	const lc = new GenericStorage(storage, (k,v,s) => {
		// Update local storage as soon as we detect a change
		window.localStorage.setItem(namespace, JSON.stringify(s));
	});
	localStorageRegistry.set(namespace, lc);
	return lc;
}