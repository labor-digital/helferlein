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
 * Last modified: 2019.04.02 at 11:43
 */

import {emitDomEvent} from '../Events/DomEvents/emitDomEvent';
import {onDomMutation} from '../Events/DomEvents/onDomMutation';
import type {EventBus} from '../Events/EventBus';
import {EventEmitter, EventEmitterEvent} from '../Events/EventEmitter';
import type {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from '../Lists/forEach';
import {isFunction} from '../Types/isFunction';
import {isObject} from '../Types/isObject';
import {isUndefined} from '../Types/isUndefined';
import type {GenericStorageInterface} from './GenericStorageInterface';

export type ComponentProxyEventTarget =
    Document
    | Window
    | HTMLElement
    | GenericStorageInterface
    | EventBus
    | EventEmitter
    | Object;

export type ComponentProxyHookTarget = GenericStorageInterface
    | EventBus
    | EventEmitter

export interface ComponentProxyListener extends Function
{
    apply: any;
    
    (evt: Event | EventEmitterEvent | any): void | any;
}

export interface ComponentProxyAsyncWrapper
{
    (concrete: Function): void
}

/**
 * Helper to extract the event emitter from a gaiven target
 * @param target
 */
function resolveEmitterIfPossible(target: ComponentProxyEventTarget): EventEmitter | ComponentProxyEventTarget
{
    if ((isFunction(target) || isObject(target)) && isFunction((target as any).getEmitter)) {
        return (target as any).getEmitter();
    }
    
    return target;
}

/**
 * Imagine the following: Your component needs outside connections, either to listen for DOM events, other libraries, hooks into a promise chain,
 * registers a callback, you get the gist. But what if your component gets destroyed? You have to unbind all event listeners, decouple
 * all callbacks, cancel all timeouts and intervals. Have you ever tried to "un-register" a then() in a promise chain?
 * Did you ever forget one a single listener that lead to a memory leak?
 *
 * Not anymore, I tell you! Behold the sparkling new ComponentProxy-2000 and enter the world of proxying everything
 * your component does with the outside world.
 *
 * It's so simple: 1. Create a proxy instance inside your component. 2. supply it the component's instance,
 * so the proxy knows it's "this". 3. start registering events, timeouts and intervals by proxy!
 *
 * When your component reaches the end of its lifecycle call the proxy.destroy() method and the proxy will
 * do all the unbinding for you, cleaning up all the junk with one simple call.
 */
export class ComponentProxy
{
    /**
     * The component which is used as this context inside the proxy instance
     */
    protected thisContext: any;
    
    /**
     * Allows to call a wrapper function every time a async function is triggered.
     * This allows advanced setups when you work with state management libraries like mobx.
     * You could, for example wrapp all calls through the proxy in a runInAction() wrap.
     * @see https://mobx.js.org/actions.html#asynchronous-actions
     * @protected
     */
    protected asyncWrapper: ComponentProxyAsyncWrapper;
    
    /**
     * False if this instance was destroyed
     */
    protected lives: boolean;
    
    /**
     * Contains the list of all timeouts that are bound on this block
     */
    protected timeouts: Array<number>;
    
    /**
     * Contains the list of all intervals that are bound on this block
     */
    protected intervals: Array<number>;
    
    /**
     * The list of all registered event listeners and their matching proxy functions
     * by the target and event name
     */
    protected events: Map<ComponentProxyEventTarget,
        Map<string,
            Map<ComponentProxyListener, Function>>>;
    
    /**
     * The list of registered mutation observers by their target objects
     */
    protected mutationObservers?: Map<ComponentProxyEventTarget, MutationObserver>;
    
    /**
     * The internal event emitter to handle mutation events
     */
    protected mutationEmitter?: EventEmitter;
    
    constructor(thisContext: any, asyncWrapper?: ComponentProxyAsyncWrapper)
    {
        this.lives = true;
        this.thisContext = thisContext;
        this.asyncWrapper = asyncWrapper ?? ((f) => f());
        this.timeouts = [];
        this.intervals = [];
        this.events = new Map();
    }
    
    /**
     * INTERVALS
     * ==================================================================
     */
    /**
     * Registers a handler to run in a specified interval.
     * The interval will automatically be stopped when the block is destroyed
     * @param handler
     * @param timeout
     */
    public setInterval(handler: (...args: any[]) => void, timeout: number): number;
    
    /**
     * Registers a handler to run in a specified interval.
     * The interval will automatically be stopped when the block is destroyed
     * @param handler
     * @param timeout
     * @param args
     */
    public setInterval(handler: (...args: any[]) => void, timeout?: any, ...args: any[]): number;
    public setInterval(handler: (...args: any[]) => void, timeout: number, ...args: any[]): number
    {
        if (!this.lives) {
            return 0;
        }
        
        const i: any = setInterval(() => {
            this.asyncWrapper(() => handler.apply(this.thisContext, args));
        }, timeout);
        
        this.intervals.push(i);
        
        return i;
    }
    
    /**
     * Removes a given interval on the current block
     * @param id
     */
    public clearInterval(id: number)
    {
        if (!this.lives) {
            return;
        }
        
        const k = this.intervals.indexOf(id);
        clearInterval(id);
        
        if (k !== -1) {
            this.intervals.splice(k, 1);
        }
    }
    
    /**
     * TIMEOUTS
     * ==================================================================
     */
    /**
     * Registers a timeout to run after a specified timespan.
     * The timout will automatically be stopped when the block is destroyed
     * @param handler
     * @param timeout
     */
    public setTimeout(handler: (...args: any[]) => void, timeout: number): number;
    
    /**
     * Registers a timeout to run after a specified timespan.
     * The timout will automatically be stopped when the block is destroyed
     * @param handler
     * @param timeout
     * @param args
     */
    public setTimeout(handler: (...args: any[]) => void, timeout?: any, ...args: any[]): number;
    public setTimeout(handler: (...args: any[]) => void, timeout: number, ...args: any[]): number
    {
        if (!this.lives) {
            return 0;
        }
        
        const i: any = setTimeout(() => {
            // Clean up to keep the memory tidy
            const k = this.timeouts.indexOf(i);
            
            if (k !== -1) {
                this.timeouts.splice(k, 1);
            }
            
            this.asyncWrapper(() => handler.apply(this.thisContext, args));
        }, timeout);
        
        this.timeouts.push(i);
        
        return i;
    }
    
    /**
     * Clears a given timeout id
     * @param id
     */
    public clearTimeout(id: number)
    {
        if (!this.lives) {
            return;
        }
        
        const k = this.timeouts.indexOf(id);
        clearTimeout(id);
        
        if (k === -1) {
            return;
        }
        
        this.timeouts.splice(k, 1);
    }
    
    /**
     * PROMISES AND CALLBACKS
     * ==================================================================
     */
    /**
     * This helper can be used in a promise chain Promise().then(this.promiseProxy()).then(...)
     * This makes sure that even if the current block is destroyed the chained functions will not be executed
     * and may break stuff.
     */
    public promiseProxy(): Function
    {
        const that = this;
        
        return function (args?: any): Promise<any> | any {
            if (isUndefined(that) || !that.lives) {
                const noopPromise = {
                    finally: () => noopPromise,
                    then: () => noopPromise,
                    catch: () => noopPromise
                };
                return noopPromise;
            }
            
            return Promise.resolve(args);
        };
    }
    
    /**
     * Wrap all callbacks to the outside world with this method so you can be sure there won't be issues
     * even if your component is destroyed before the outside function finishes
     * outsideFunction(proxy.callbackProxy((...args) => console.log(args)));
     * @param callback
     */
    public callbackProxy<T = Function>(callback: T): T
    {
        const that = this;
        return function (...args: [any]): Promise<any> | any {
            if (!isUndefined(that) && that.lives) {
                return;
            }
            
            return that.asyncWrapper(
                () => (callback as any).apply(that.thisContext, args)
            );
        } as any;
    }
    
    /**
     * EVENTS
     * ==================================================================
     */
    /**
     * Emits a given event which has the option to pass additional arguments.
     * @param target The target to trigger the event on. Either a html element, the document or the EventBus class
     * @param event The name of the event to emit
     * @param args An object of arguments which then are transferred to e.args in your callback
     */
    public emit(target: ComponentProxyEventTarget, event: string, args?: PlainObject): ComponentProxy
    {
        if (!this.lives) {
            return this;
        }
        
        target = resolveEmitterIfPossible(target);
        
        if (isObject(target) && isFunction((target as any).emit)) {
            (target as any).emit(event, args);
        } else if (isFunction((target as HTMLElement).dispatchEvent)) {
            emitDomEvent((target as HTMLElement), event, args);
        } else {
            throw new Error('Could not emit event "' + event + '", because the given target is invalid!');
        }
        
        return this;
    }
    
    /**
     * Emits a given hook to process the given arguments
     * @param target The target to trigger the event on. Either a EventBus, EventEmitter or storage object
     * @param event The name of the hook to emit
     * @param args An object of arguments which then are transferred to e.args in your callbacks
     * @see EventEmitter.emitHook()
     */
    emitHook(target: ComponentProxyHookTarget, event: string, args: PlainObject): Promise<PlainObject>
    {
        if (!this.lives) {
            return Promise.resolve(args);
        }
        
        target = resolveEmitterIfPossible(target);
        
        if (isObject(target) && isFunction((target as any).emit)) {
            return (target as any).emit(event, args);
        }
        
        throw new Error('Could not emit hook "' + event + '", because the given target is invalid!');
    }
    
    /**
     * Binds a given listener to a certain event
     *
     * @param target The target to bind the listener to. Either a html element, the document or the EventBus class
     * @param event The name of the event to bind the listener to. If you use "@mutation" a MutationObserver will track
     *                any changes of the dom and call the listener on it
     * @param listener The listener which is called when the event is emitted on the given target
     * @param priority Default: 0, the lower the number, the earlier the execution. May be a negative value!
     *                    Note: This only works for event emitters and the event bus.
     *                    @todo add html event listener options like passive and capture!
     */
    bind(
        target: ComponentProxyEventTarget,
        event: string,
        listener: ComponentProxyListener,
        priority?: number
    ): ComponentProxy
    {
        if (!this.lives) {
            return this;
        }
        
        target = resolveEmitterIfPossible(target);
        
        if (!this.events.has(target)) {
            this.events.set(target, new Map());
        }
        
        if (!this.events.get(target)!.has(event)) {
            this.events.get(target)!.set(event, new Map());
        }
        
        // Retrieve or create the proxy
        let proxy: any = this.events.get(target)!.get(event)!.get(listener);
        if (isUndefined(proxy)) {
            const thisContext = this.thisContext;
            
            proxy = (...args: [any]) => {
                this.asyncWrapper(() => listener.apply(thisContext, args));
            };
            
            this.events.get(target)!.get(event)!.set(listener, proxy);
        }
        
        // Execute the binding
        if (isObject(target) && isFunction((target as any).bind)) {
            (target as any).bind(event, proxy, priority);
        } else if (isFunction((target as HTMLElement).addEventListener)) {
            
            // Special event handling for @mutation
            if (event === '@mutation') {
                // Bind our proxy
                if (isUndefined(this.mutationEmitter)) {
                    this.mutationObservers = new Map();
                    this.mutationEmitter = new EventEmitter();
                }
                this.mutationEmitter.bind('', proxy);
                
                // Make sure we have an observer on that target
                if (!this.mutationObservers!.has(target)) {
                    this.mutationObservers!.set(target, onDomMutation((target as HTMLElement),
                        (args: { target: any, mutations: MutationRecord[], observer: MutationObserver }) => {
                            this.mutationEmitter!.emit('', args);
                        }));
                }
                
                // Done
                return this;
            }
            
            // Default handling
            (target as HTMLElement).addEventListener(event, proxy);
        } else {
            throw new Error('Could not bind to event "' + event + '", because the given target is invalid!');
        }
        
        // Done
        return this;
    }
    
    /**
     * Removes a given listener from a certain event
     * @param target The target to unbind the listener from. Either a html element, the document or the EventBus class
     * @param event The event to unbind or @mutation if a mutation observer is used
     * @param listener The listener which should be unbound for the given event
     * @todo add html event listener options like passive and capture!
     * @todo While addEventListener() will let you add the same listener more than once for the same type if the options are different, the only option removeEventListener() checks is the capture/useCapture flag. Its value must match for removeEventListener() to match, but the other values don't.
     */
    unbind(target: ComponentProxyEventTarget, event: string, listener: ComponentProxyListener): ComponentProxy
    {
        if (this.lives) {
            this._unbind(target, event, listener);
        }
        
        return this;
    }
    
    /**
     * Unbinds all event listeners and mutation objservers from the dom
     */
    public unbindAll(): ComponentProxy
    {
        if (!this.lives) {
            return this;
        }
        
        this._unbindAll();
        
        return this;
    }
    
    /**
     * DESTRUCTION
     * ==================================================================
     */
    /**
     * Call this method when your component is destroyed.
     * The proxy will then unbind all events, timeouts, intervals and block all promises
     * which could lead to errors or memory leaks
     */
    public destroy(): ComponentProxy
    {
        if (!this.lives) {
            return this;
        }
        
        this.lives = false;
        
        // Intervals
        if (this.intervals.length > 0) {
            forEach(this.intervals, i => clearInterval(i));
        }
        
        // Timeouts
        if (this.timeouts.length > 0) {
            forEach(this.timeouts, t => clearTimeout(t));
        }
        
        // EventListeners and MutationObservers
        this._unbindAll();
        
        // Remove my properties
        this.intervals = null as any;
        this.timeouts = null as any;
        this.events = null as any;
        
        delete this.thisContext;
        delete this.mutationEmitter;
        delete this.mutationObservers;
        
        // Be dead
        return this;
    }
    
    /**
     * Returns true if this proxy is destroyed, false if not
     */
    public isDestroyed(): boolean
    {
        return !this.lives;
    }
    
    /**
     * Internal logic to unbind all currently registered events
     * @protected
     */
    protected _unbindAll(): void
    {
        // Events
        forEach(this.events, (eventList, target) => {
            forEach(eventList, (listeners, event) => {
                forEach(listeners, (_, listener) => {
                    this._unbind(target, event, listener);
                });
            });
        });
        
        // Mutation observers
        if (!isUndefined(this.mutationObservers)) {
            forEach(this.mutationObservers, (o: MutationObserver, k) => {
                o.disconnect();
                this.mutationObservers!.delete(k);
            });
        }
    }
    
    /**
     * Internal logic to unbind an event from a listener.
     * This method does not do any validation if the proxy still lives so it can be called in the destroy method
     * @param target
     * @param event
     * @param listener
     */
    protected _unbind(target: ComponentProxyEventTarget, event: string, listener: ComponentProxyListener): void
    {
        target = resolveEmitterIfPossible(target);
        
        if (this.events.has(target) &&
            this.events.get(target)!.has(event) &&
            this.events.get(target)!.get(event)!.has(listener)) {
            
            // Get the proxy instance
            const eventList = this.events.get(target);
            const eventListeners = eventList!.get(event);
            const proxy: any = eventListeners!.get(listener);
            
            // Remove the listener and clean up
            eventListeners!.delete(listener);
            if (eventListeners!.size === 0) {
                eventList!.delete(event);
            }
            if (eventList!.size === 0) {
                this.events.delete(target);
            }
            
            // Replace the listener with our proxy
            listener = proxy;
        }
        
        // Remove the binding
        if (isObject(target) && isFunction((target as any).unbind)) {
            (target as any).unbind(event, listener);
        } else if (isFunction((target as HTMLElement).removeEventListener)) {
            
            // Special event handling for @mutation
            if (event === '@mutation') {
                if (isUndefined(this.mutationEmitter)) {
                    return;
                }
                this.mutationEmitter.unbind('', listener);
                return;
            }
            
            // Default handling
            (target as HTMLElement).removeEventListener(event, listener);
        } else {
            throw new Error('Could not bind to event "' + event + '", because the given target is invalid!');
        }
    }
}