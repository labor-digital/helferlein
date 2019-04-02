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

import {EventBus} from "../Browser/EventBus";
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {getGuid} from "../Misc/getGuid";
import {isUndefined} from "../Types/isUndefined";
import {EventProxyListener, EventProxyRegistry} from "./EventProxyRegistry";
import {GenericStorageInterface, GenericStorageWatcher} from "./GenericStorageInterface";

export class GenericStorage implements GenericStorageInterface {
	
	/**
	 * Marker to let other helpers know, that this is a watchable instance
	 */
	public $isWatchable: boolean;
	
	/**
	 * The reference to the storage object
	 */
	protected storage: PlainObject;
	
	/**
	 * A unique id for this storage instance
	 */
	protected id: string;
	
	/**
	 * Holds the proxy registry if it was required by the watch() method
	 */
	protected proxyRegistry: EventProxyRegistry | undefined;
	
	/**
	 * This is true if watch() was called with a "*" as key which means
	 * call the callback on every change
	 */
	protected hasWildcardWatcher: boolean;
	
	/**
	 * Storage constructor
	 * @param ref can be used to supply a plain element's reference as storage element
	 */
	constructor(ref?: PlainObject) {
		this.storage = ref || {};
		this.$isWatchable = true;
		this.id = getGuid();
		this.hasWildcardWatcher = false;
	}
	
	/**
	 * Registers a callback which is executed every time the key's value has changed
	 * NOTE: Changed means changed. If the value is the same as before the callback will not be triggered!
	 * @param key
	 * @param callback
	 */
	public watch(key: string | number, callback: GenericStorageWatcher) {
		key = key + "";
		if (isUndefined(this.proxyRegistry)) this.proxyRegistry = new EventProxyRegistry(this);
		if (!this.hasWildcardWatcher && key === "*") this.hasWildcardWatcher = true;
		EventBus.bind(this.getEventName(key), this.proxyRegistry.bindProxy(key, callback as EventProxyListener, () => {
			return (event) => {
				callback(event.args.value, event.args.oldValue, this.storage, event.args.key + "");
			};
		}));
	}
	
	/**
	 * Removes a given callback as watcher for the given storage key
	 * @param key
	 * @param callback
	 */
	public unwatch(key: string | number, callback: GenericStorageWatcher) {
		key = key + "";
		if (isUndefined(this.proxyRegistry)) return;
		EventBus.unbind(this.getEventName(key), this.proxyRegistry.unbindProxy(key, callback as EventProxyListener));
		if (!this.hasWildcardWatcher && key === "*" && !this.proxyRegistry.hasProxiesFor("*"))
			this.hasWildcardWatcher = false;
	}
	
	/**
	 * Returns the current value for the given storage key. If the key is not set (undefined)
	 * the fallback value will be returned instead.
	 *
	 * @param key
	 * @param fallback
	 */
	get(key?: string | number, fallback?: any): any {
		if (isUndefined(key)) return this.storage;
		if (isUndefined(this.storage[key + ""])) return fallback;
		return this.storage[key + ""];
	}
	
	/**
	 * Sets a given value to a given key in the storage
	 * @param key
	 * @param value
	 */
	set(key: string | number, value: any): GenericStorage {
		if (isUndefined(key)) throw new Error("Missing storage key!");
		if (isUndefined(value)) throw new Error("Missing storage value!");
		const oldValue = value;
		this.storage[key + ""] = value;
		if (!isUndefined(this.proxyRegistry) && this.storage[key + ""] !== value) {
			EventBus.emit(this.getEventName(key + ""), {value, oldValue, key});
			if (this.hasWildcardWatcher)
				EventBus.emit(this.getEventName("*"), {value, oldValue, key});
		}
		return this;
	}
	
	/**
	 * Returns true if the storage object contains a value for the given key
	 * @param key
	 */
	has(key: string | number): boolean {
		if (isUndefined(key)) throw new Error("Missing storage key!");
		return !isUndefined(this.storage[key + ""]);
	}
	
	/**
	 * Removes a given key from the storage list
	 * @param key
	 */
	remove(key: string | number): GenericStorage {
		if (isUndefined(key)) throw new Error("Missing storage key!");
		const oldValue = this.storage[key + ""];
		delete this.storage[key + ""];
		if (!isUndefined(this.proxyRegistry)) {
			EventBus.emit(this.getEventName(key + ""), {undefined, oldValue, key});
			if (this.hasWildcardWatcher)
				EventBus.emit(this.getEventName("*"), {undefined, oldValue, key});
		}
		return this;
	}
	
	/**
	 * Iteration for the storage
	 * @param callback
	 */
	forEach(callback: Function) {
		forEach(this.storage, (v, k) => callback(v, k, this.storage));
	}
	
	/**
	 * Generates a unique event name based on the given storage key
	 * @param key
	 */
	protected getEventName(key: string): string {
		return "gs-change-" + this.id + "-" + key;
	}
}