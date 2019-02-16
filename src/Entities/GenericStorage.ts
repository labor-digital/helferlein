/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.01.11 at 18:55
 */

import {PlainObject} from "../Interfaces/PlainObject";
import {isUndefined} from "../Types/isUndefined";
import {forEach} from "../Lists/forEach";
import {GenericStorageInterface} from "./GenericStorageInterface";
import {isFunction} from "../Types/isFunction";

/**
 * Created by Martin Neundorfer on 10.01.2019.
 * For LABOR.digital
 */
export class GenericStorage implements GenericStorageInterface {
	/**
	 * The reference to the storage object
	 */
	protected _storage: PlainObject;

	/**
	 * Optional savehandler which is called every time a value was updated
	 */
	protected _onChange?: Function;

	constructor(ref?: PlainObject, onChange?: Function) {
		this._storage = ref || {};
		this._onChange = onChange;
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
		if(isFunction(this._onChange) && this._storage[key + ""] !== value){
			this._storage[key + ""] = value;
			this._onChange(key, value, this._storage);
		} else
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
		if(isFunction(this._onChange))
			this._onChange(key, undefined, this._storage);
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