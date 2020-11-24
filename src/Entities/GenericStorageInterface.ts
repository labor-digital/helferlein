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
 * Last modified: 2019.01.10 at 10:55
 */

import {EventEmitterCallbackEventListener, PlainObject} from '..';

export interface GenericStorageWatcher extends EventEmitterCallbackEventListener
{
    (value, valueOld, storage: PlainObject, key: string)
}

export interface GenericStorageInterface
{
    
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
    
    /**
     * Registers a callback which is executed every time the key's value has changed
     * NOTE: Changed means changed. If the value is the same as before the callback will not be triggered!
     * @param key
     * @param callback
     */
    watch(key: string | number, callback: GenericStorageWatcher): GenericStorageInterface;
    
    /**
     * Removes a given callback as watcher for the given storage key
     * @param key
     * @param callback
     */
    unwatch(key: string | number, callback: GenericStorageWatcher): GenericStorageInterface;
}