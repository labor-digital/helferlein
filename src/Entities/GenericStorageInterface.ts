import {GenericStorage} from "./GenericStorage";

export interface GenericStorageInterface {
	/**
	 * Returns the current value for the given storage key. If the key is not set (undefined)
	 * the fallback value will be returned instead.
	 *
	 * @param key
	 * @param fallback
	 */
	get(key?: string | number, fallback?: any): any;

	/**
	 * Sets a given value to a given key in the storage
	 * @param key
	 * @param value
	 */
	set(key: string | number, value: any): GenericStorageInterface;

	/**
	 * Returns true if the storage object contains a value for the given key
	 * @param key
	 */
	has(key: string | number): boolean;

	/**
	 * Removes a given key from the storage list
	 * @param key
	 */
	remove(key: string | number): GenericStorageInterface;

	/**
	 * Iteration for the storage
	 * @param callback
	 */
	forEach(callback: Function): void;
}