import {PlainObject} from "../Interfaces/PlainObject";
import {isUndefined} from "../Types/isUndefined";
import {forEach} from "../Lists/forEach";
import {GenericStorageInterface} from "./GenericStorageInterface";

/**
 * Created by Martin Neundorfer on 10.01.2019.
 * For LABOR.digital
 */
export class GenericStorage implements GenericStorageInterface {
	/**
	 * The reference to the storage object
	 */
	protected _storage: PlainObject;

	constructor(ref?: PlainObject) {
		this._storage = ref || {};
	}

	/**
	 * Returns the current value for the given storage key. If the key is not set (undefined)
	 * the fallback value will be returned instead.
	 *
	 * @param key
	 * @param fallback
	 */
	get(key?: string | number, fallback?: any): any {
		if (isUndefined(key)) return this._storage;
		if (isUndefined(this._storage[key + ""])) return fallback;
		return this._storage[key + ""];
	}

	/**
	 * Sets a given value to a given key in the storage
	 * @param key
	 * @param value
	 */
	set(key: string | number, value: any): GenericStorage {
		if (isUndefined(key)) throw new Error("Missing storage key!");
		if (isUndefined(value)) throw new Error("Missing storage value!");
		this._storage[key + ""] = value;
		return this;
	}

	/**
	 * Returns true if the storage object contains a value for the given key
	 * @param key
	 */
	has(key: string | number): boolean {
		if (isUndefined(key)) throw new Error("Missing storage key!");
		return !isUndefined(this._storage[key + ""]);
	}

	/**
	 * Removes a given key from the storage list
	 * @param key
	 */
	remove(key: string | number): GenericStorage {
		if (isUndefined(key)) throw new Error("Missing storage key!");
		delete this._storage[key + ""];
		return this;
	}

	/**
	 * Iteration for the storage
	 * @param callback
	 */
	forEach(callback: Function) {
		forEach(this._storage, (v, k) => callback(v, k, this._storage));
	}
}