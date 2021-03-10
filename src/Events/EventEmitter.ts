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
 * Last modified: 2019.04.02 at 13:14
 */

import {asArray} from '../FormatAndConvert/asArray';
import type {PlainObject} from '../Interfaces/PlainObject';
import {filter} from '../Lists/filter';
import {forEach} from '../Lists/forEach';
import {sort} from '../Lists/sort';
import {isArray} from '../Types/isArray';
import {isFunction} from '../Types/isFunction';
import {isNumber} from '../Types/isNumber';
import {isObject} from '../Types/isObject';
import {isPlainObject} from '../Types/isPlainObject';
import {isString} from '../Types/isString';
import {isUndefined} from '../Types/isUndefined';

export class EventEmitterEvent
{
    public name: string;
    public args: PlainObject;
    public isPropagationStopped: boolean;
    
    constructor(name: string, args: PlainObject)
    {
        this.name = name;
        this.args = args;
        this.isPropagationStopped = false;
    }
    
    public stopPropagation()
    {
        this.isPropagationStopped = true;
    }
}

export interface EventEmitterEventListener
{
    (evt: EventEmitterEvent | any): void | Promise<void> | any;
}

export interface EventEmitterCallbackEventListener
{
    (a?: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}

export class EventEmitter
{
    /**
     * The list of events that are registered in this emitter
     */
    protected events: PlainObject<Array<{
        priority: number,
        listener: EventEmitterEventListener | EventEmitterCallbackEventListener
    }>>;
    
    /**
     * If true the emitter will emit the event as callback and not using the event object
     */
    protected emitAsCallback: boolean;
    
    /**
     * Constructor
     *
     * @param emitAsCallback If set to true, the callbacks will receive the arguments as function arguments, instead of a single event object
     */
    constructor(emitAsCallback?: boolean)
    {
        this.events = {};
        this.emitAsCallback = emitAsCallback === true;
    }
    
    /**
     * Emits a given event which has the option to pass additional arguments.
     * @param event
     * @param args
     */
    emit(event: string | Array<string>, args?: PlainObject): EventEmitter
    {
        args = args ?? {};
        
        // Check if we got an array of strings
        if (isArray(event)) {
            forEach(event, e => this.emit(e, args));
            return this;
        }
        
        // Loop through the events
        if (!isUndefined(this.events[event])) {
            const e = new EventEmitterEvent(event, args);
            forEach(this.events[event], definition => {
                if (this.emitAsCallback) {
                    if ((definition as any).listener(...asArray(e.args)) === false) {
                        e.stopPropagation();
                    }
                } else {
                    definition.listener(e);
                }
                if (e.isPropagationStopped) {
                    return false;
                }
            });
        }
        
        return this;
    }
    
    /**
     * Hooks are quite similar to events and share the same namespace with them.
     * They however have one distinct difference when it comes to their handling.
     * Events are called async, you emit an event and go on. A hook however waits
     * for the registered listeners to finish and allows them to process the given arguments.
     * All listeners are executed in sequence, even if they are async and return a promise object.
     *
     * Therefore this method will always return a promise object you have to wait for.
     *
     * @param event
     * @param args
     */
    emitHook(event: string | Array<string>, args: PlainObject): Promise<PlainObject>
    {
        
        // Check if we got arguments
        if (isUndefined(args) || !isPlainObject(args)) {
            args = {};
        }
        
        // Check if we got an array of strings
        if (isArray(event)) {
            const promises: Array<Promise<any>> = [];
            
            forEach(event, e => {
                promises.push(this.emitHook(e, args));
            });
            
            return Promise.all(promises);
        }
        
        // Skip if we don't know this event
        if (isUndefined(this.events[event])) {
            return Promise.resolve(args);
        }
        
        // Create the event instance
        const e = new EventEmitterEvent(event, args);
        
        // Loop through the event list using a promise list
        const eventList = this.events[event as string];
        let i = 0;
        
        // Create the promise which handles our async events
        return new Promise<PlainObject>((resolve, reject) => {
            /**
             * Helper to iterate over the event list and check if we got a promise as result -> Wait for it if required.
             * @param next
             */
            const next = (next: Function): void => {
                
                // Check if we have a next listener or break the loop
                const definition = eventList[i++];
                if (isUndefined(definition) || e.isPropagationStopped) {
                    resolve(args);
                    return;
                }
                
                // Call the listener
                const result = this.emitAsCallback ?
                    (definition.listener as EventEmitterCallbackEventListener)(...asArray(args)) :
                    definition.listener(e);
                
                // Check if the propagation was stopped the old way
                if (this.emitAsCallback && result === false) {
                    e.isPropagationStopped = true;
                }
                
                // Check if the listener returned a promise
                if (isObject(result) && isFunction(result.then) && isFunction(result.catch)) {
                    result.then(() => {
                        next(next);
                    }).catch(reject);
                    return;
                }
                
                // Go to next listener
                next(next);
            };
            
            // Start the listener loop
            next(next);
        });
    }
    
    /**
     * Binds a given listener to a certain event
     * @param event
     * @param listener
     * @param priority Default: 0, the lower the number, the earlier the execution. May be a negative value!
     */
    bind(
        event: string,
        listener: EventEmitterEventListener | EventEmitterCallbackEventListener,
        priority?: number
    ): EventEmitter
    {
        if (isUndefined(this.events[event])) {
            this.events[event] = [];
        }
        
        this.events[event].push({
            listener, priority: isNumber(priority) ? priority : 0
        });
        
        if (this.events[event].length > 1) {
            this.events[event] = sort(this.events[event], 'priority') as any;
        }
        
        return this;
    }
    
    /**
     * Removes a given listener from a certain event
     * @param event
     * @param listener
     */
    unbind(event: string, listener: EventEmitterEventListener | EventEmitterCallbackEventListener): EventEmitter
    {
        if (isUndefined(this.events[event])) {
            return this;
        }
        
        this.events[event] = filter(this.events[event], (v) => {
            return v.listener !== listener;
        });
        
        if (this.events[event].length === 0) {
            delete this.events[event];
        }
        
        return this;
    }
    
    /**
     * Unbinds either all listeners of a single event, or all listeners for all events
     * @param event
     */
    unbindAll(event?: string): EventEmitter
    {
        if (!isString(event)) {
            this.events = {};
        } else {
            delete this.events[event];
        }
        return this;
    }
}