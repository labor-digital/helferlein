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

import {emitDomEvent} from "../Events/DomEvents/emitDomEvent";
import {onDomMutation} from "../Events/DomEvents/onDomMutation";
import {EventBus} from "../Events/EventBus";
import {EventEmitter, EventEmitterEvent} from "../Events/EventEmitter";
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {isFunction} from "../Types/isFunction";
import {isObject} from "../Types/isObject";
import {isUndefined} from "../Types/isUndefined";
import {GenericStorageInterface} from "./GenericStorageInterface";

export type ComponentProxyEventTarget =
	Document
	| Window
	| HTMLElement
	| GenericStorageInterface
	| EventBus
	| EventEmitter
	| Object;

export interface ComponentProxyListener extends Function {
	apply: any;
	
	(evt: Event | EventEmitterEvent | any): void | any;
}

/**
 * This class is ment to be used inside of js components.
 * The promise is simple: Sometimes your component needs outside connections to the dom, other libraries, hooks into a promise chain,
 * registers a callback or something else. But what's if your component gets destroyed? You have to unbind all event listeners, decouple
 * all callbacks, cancel all timeouts and intervals. If you forget one? The instance will stay in the memory for the rest of the page's livecycle.
 *
 * To make the handling in that case a lot easier you can use this proxy class.
 * Create it inside your component, supply it the component's instance as "this" context and register events, timeouts and intervals
 * using the proxy. When your component reaches the end of it's livecycle call the proxy.destroy() method and the proxy will
 * do all the unbinding for you, cleaning up all the junk you might forget at some point.
 */
export class ComponentProxy {
	
	/**
	 * The component which is used as this context inside the proxy instance
	 */
	protected thisContext: any;
	
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
	protected mutationObservers: Map<ComponentProxyEventTarget, MutationObserver>;
	
	/**
	 * The internal event emitter to handle mutation events
	 */
	protected mutationEmitter: EventEmitter;
	
	constructor(thisContext) {
		this.lives = true;
		this.thisContext = thisContext;
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
	setInterval(handler: (...args: any[]) => void, timeout: number): number;
	
	/**
	 * Registers a handler to run in a specified interval.
	 * The interval will automatically be stopped when the block is destroyed
	 * @param handler
	 * @param timeout
	 * @param args
	 */
	setInterval(handler: (...args: any[]) => void, timeout?: any, ...args: any[]): number;
	setInterval(handler: (...args: any[]) => void, timeout: number, ...args: any[]): number {
		const i: any = setInterval(() => {
			handler.apply(this.thisContext, args);
		}, timeout);
		this.intervals.push(i);
		return i;
	}
	
	/**
	 * Removes a given interval on the current block
	 * @param id
	 */
	clearInterval(id: number) {
		const k = this.intervals.indexOf(id);
		clearInterval(id);
		if (k === -1) return;
		this.intervals.splice(k, 1);
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
	setTimeout(handler: (...args: any[]) => void, timeout: number): number;
	
	/**
	 * Registers a timeout to run after a specified timespan.
	 * The timout will automatically be stopped when the block is destroyed
	 * @param handler
	 * @param timeout
	 * @param args
	 */
	setTimeout(handler: (...args: any[]) => void, timeout?: any, ...args: any[]): number;
	setTimeout(handler: (...args: any[]) => void, timeout: number, ...args: any[]): number {
		const i: any = setTimeout(() => {
			// Clean up to keep the memory tidy
			const k = this.timeouts.indexOf(i);
			if (k !== -1) this.timeouts.splice(k, 1);
			handler.apply(this.thisContext, args);
		}, timeout);
		this.timeouts.push(i);
		return i;
	}
	
	/**
	 * Clears a given timeout id
	 * @param id
	 */
	clearTimeout(id: number) {
		const k = this.timeouts.indexOf(id);
		clearTimeout(id);
		if (k === -1) return;
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
	promiseProxy(): Function {
		const that = this;
		return function (args?: any): Promise<any> | any {
			if (isUndefined(that) || !isFunction(that.isDestroyed) || that.isDestroyed() === true) {
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
	callbackProxy(callback): Function {
		const that = this;
		return function (args?: any): Promise<any> | any {
			if (isUndefined(that) || !isFunction(that.isDestroyed) || that.isDestroyed() === true) return;
			return callback.apply(that.thisContext, Array.prototype.slice.call(arguments));
		};
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
	emit(target: ComponentProxyEventTarget, event: string, args?: PlainObject): ComponentProxy {
		if (this.isDestroyed()) return this;
		
		if ((isFunction(target) || isObject(target)) && isFunction((target as any).getEmitter))
			target = (target as any).getEmitter();
		if (isObject(target) && isFunction((target as any).emit))
			(target as any).emit(event, args);
		else if (isFunction((target as HTMLElement).dispatchEvent)) {
			emitDomEvent((target as HTMLElement), event, args);
		} else throw new Error("Could not emit event \"" + event + "\", because the given target is invalid!");
		return this;
	}
	
	/**
	 * Binds a given listener to a certain event
	 *
	 * @param target The target to bind the listener to. Either a html element, the document or the EventBus class
	 * @param event The name of the event to bind the listener to. If you use "@mutation" a MutationObserver will track
	 *                any changes of the dom and call the listener on it
	 * @param listener The listener which is called when the event is emitted on the given target
	 */
	bind(target: ComponentProxyEventTarget, event: string, listener: ComponentProxyListener): ComponentProxy {
		if (this.isDestroyed()) return this;
		
		// Prepare the target
		if ((isFunction(target) || isObject(target)) && isFunction((target as any).getEmitter))
			target = (target as any).getEmitter();
		
		// Prepare storage
		if (!this.events.has(target)) this.events.set(target, new Map());
		if (!this.events.get(target).has(event)) this.events.get(target).set(event, new Map());
		
		// Retrieve or create the proxy
		let proxy: any = this.events.get(target).get(event).get(listener);
		if (isUndefined(proxy)) {
			const thisContext = this.thisContext;
			proxy = function () {
				listener.apply(thisContext, arguments);
			};
			this.events.get(target).get(event).set(listener, proxy);
		}
		
		// Execute the binding
		if (isObject(target) && isFunction((target as any).bind))
			(target as any).bind(event, proxy);
		else if (isFunction((target as HTMLElement).addEventListener)) {
			
			// Special event handling for @mutation
			if (event === "@mutation") {
				// Bind our proxy
				if (isUndefined(this.mutationEmitter)) {
					this.mutationObservers = new Map();
					this.mutationEmitter = new EventEmitter();
				}
				this.mutationEmitter.bind("", proxy);
				
				// Make sure we have an observer on that target
				if (!this.mutationObservers.has(target)) {
					this.mutationObservers.set(target, onDomMutation((target as HTMLElement),
						(args: { target: any, mutations: MutationRecord[], observer: MutationObserver }) => {
							this.mutationEmitter.emit("", args);
						}));
				}
				
				// Done
				return this;
			}
			
			// Default handling
			(target as HTMLElement).addEventListener(event, proxy);
		} else throw new Error("Could not bind to event \"" + event + "\", because the given target is invalid!");
		
		// Done
		return this;
	}
	
	/**
	 * Removes a given listener from a certain event
	 * @param target The target to unbind the listener from. Either a html element, the document or the EventBus class
	 * @param event The event to unbind or @mutation if a mutation observer is used
	 * @param listener The listener which should be unbound for the given event
	 */
	unbind(target: ComponentProxyEventTarget, event: string, listener: ComponentProxyListener): ComponentProxy {
		if (this.isDestroyed()) return this;
		
		// Prepare the target
		if ((isFunction(target) || isObject(target)) && isFunction((target as any).getEmitter))
			target = (target as any).getEmitter();
		
		// Check if we can do stuff
		if (this.events.has(target) &&
			this.events.get(target).has(event) &&
			this.events.get(target).get(event).has(listener)) {
			
			// Get the proxy instance
			const eventList = this.events.get(target);
			const eventListeners = eventList.get(event);
			const proxy: any = eventListeners.get(listener);
			
			// Remove the listener and clean up
			eventListeners.delete(listener);
			if (eventListeners.size === 0) eventList.delete(event);
			if (eventList.size === 0) this.events.delete(target);
			
			// Replace the listener with our proxy
			listener = proxy;
		}
		
		// Remove the binding
		if (isObject(target) && isFunction((target as any).unbind))
			(target as any).unbind(event, listener);
		else if (isFunction((target as HTMLElement).addEventListener)) {
			
			// Special event handling for @mutation
			if (event === "@mutation") {
				if (isUndefined(this.mutationEmitter)) return this;
				this.mutationEmitter.unbind("", listener);
				return this;
			}
			
			// Default handling
			(target as HTMLElement).removeEventListener(event, listener);
		} else throw new Error("Could not bind to event \"" + event + "\", because the given target is invalid!");
		
		// Done
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
	destroy(): ComponentProxy {
		if (this.isDestroyed()) return this;
		
		this.lives = false;
		
		// Intervals
		if (this.intervals.length > 0)
			forEach(this.intervals, i => clearInterval(i));
		
		// Timeouts
		if (this.timeouts.length > 0)
			forEach(this.timeouts, t => clearTimeout(t));
		
		// Events
		forEach(this.events, (eventList, target) => {
			forEach(eventList, (listeners, event) => {
				forEach(listeners, (proxy, listener) => {
					this.unbind(target, event, listener);
				});
			});
		});
		
		// Mutation observers
		if (!isUndefined(this.mutationEmitter)) {
			forEach(this.mutationObservers, (o: MutationObserver, k) => {
				o.disconnect();
				this.mutationObservers.delete(k);
			});
			delete this.mutationEmitter;
			delete this.mutationObservers;
		}
		
		// Remove my properties
		delete this.intervals;
		delete this.timeouts;
		delete this.thisContext;
		delete this.lives;
		delete this.events;
		
		return this;
	}
	
	/**
	 * Returns true if this proxy is destroyed, false if not
	 */
	isDestroyed(): boolean {
		return !this.lives;
	}
}