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

import {EventEmitter} from '../Events/EventEmitter';
import {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from '../Lists/forEach';
import {isUndefined} from '../Types/isUndefined';
import {GenericStorageInterface, GenericStorageWatcher} from './GenericStorageInterface';

export class GenericStorage implements GenericStorageInterface
{
    
    /**
     * The reference to the storage object
     */
    protected storage: PlainObject;
    
    /**
     * The internal event emitter to handle the watch callbacks with
     */
    protected emitter: EventEmitter;
    
    /**
     * Storage constructor
     * @param ref can be used to supply a plain element's reference as storage element
     */
    constructor(ref?: PlainObject)
    {
        this.storage = ref || {};
        this.emitter = new EventEmitter(true);
    }
    
    /**
     * Registers a callback which is executed every time the key's value has changed
     * NOTE: Changed means changed. If the value is the same as before the callback will not be triggered!
     * @param key
     * @param callback
     */
    public watch(key: string | number, callback: GenericStorageWatcher): GenericStorageInterface
    {
        this.emitter.bind(key + '', callback);
        return this;
    }
    
    /**
     * Removes a given callback as watcher for the given storage key
     * @param key
     * @param callback
     */
    public unwatch(key: string | number, callback: GenericStorageWatcher): GenericStorageInterface
    {
        this.emitter.unbind(key + '', callback);
        return this;
    }
    
    /**
     * Returns the current value for the given storage key. If the key is not set (undefined)
     * the fallback value will be returned instead.
     *
     * @param key
     * @param fallback
     */
    public get(key?: string | number, fallback?: any): any
    {
        if (isUndefined(key)) {
            return this.storage;
        }
        if (isUndefined(this.storage[key + ''])) {
            return fallback;
        }
        return this.storage[key + ''];
    }
    
    /**
     * Sets a given value to a given key in the storage
     * @param key
     * @param value
     */
    public set(key: string | number, value: any): GenericStorageInterface
    {
        if (isUndefined(key)) {
            throw new Error('Missing storage key!');
        }
        if (isUndefined(value)) {
            throw new Error('Missing storage value!');
        }
        key = key + '';
        const oldValue = this.storage[key];
        this.storage[key] = value;
        if (oldValue !== value) {
            const data = {value, oldValue, storage: this.storage, key};
            this.emitter.emit(key, data).emit('*', data);
        }
        return this;
    }
    
    /**
     * Returns true if the storage object contains a value for the given key
     * @param key
     */
    public has(key: string | number): boolean
    {
        if (isUndefined(key)) {
            throw new Error('Missing storage key!');
        }
        return !isUndefined(this.storage[key + '']);
    }
    
    /**
     * Removes a given key from the storage list
     * @param key
     */
    public remove(key: string | number): GenericStorageInterface
    {
        if (isUndefined(key)) {
            throw new Error('Missing storage key!');
        }
        key = key + '';
        const oldValue = this.storage[key];
        delete this.storage[key];
        const data = {value: undefined, oldValue, storage: this.storage, key};
        this.emitter.emit(key, data).emit('*', data);
        return this;
    }
    
    /**
     * Iteration for the storage
     * @param callback
     */
    public forEach(callback: Function)
    {
        forEach(this.storage, (v, k) => callback(v, k, this.storage));
    }
    
    /**
     * Provides a bridge for the component proxy to bind events on a storage
     */
    public getEmitter(): EventEmitter
    {
        return this.emitter;
    }
}