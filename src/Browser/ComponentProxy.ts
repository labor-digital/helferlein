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
 * Last modified: 2019.02.20 at 10:32
 */

import {EventProxyListener, EventProxyRegistry} from "../Entities/EventProxyRegistry";
import {GenericStorageInterface} from "../Entities/GenericStorageInterface";
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {getGuid} from "../Misc/getGuid";
import {isFunction} from "../Types/isFunction";
import {isObject} from "../Types/isObject";
import {isPlainObject} from "../Types/isPlainObject";
import {isUndefined} from "../Types/isUndefined";
import {EventBus} from "./EventBus";

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
	 * A list of targetId => MutationObserver references to handle @mutation events
	 */
	protected mutationTargets: Map<string, MutationObserver>;
	
	/**
	 * Holds the proxy registry which keeps track of the used event proxies
	 */
	protected proxyRegistry: EventProxyRegistry;
	
	/**
	 * The list of events, the targets and the matching listeners
	 * to be used in combination with the proxyRegistry which will keep track
	 * of the registered listeners and their targets to unbind them when the proxy is destroyed
	 */
	protected events: Map<string, { target: any, event: string, listener: EventProxyListener }>;
	
	constructor(thisContext) {
		this.lives = true;
		this.proxyRegistry = new EventProxyRegistry(this.thisContext);
		this.thisContext = thisContext;
		this.timeouts = [];
		this.intervals = [];
		this.mutationTargets = new Map();
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
	emit(target: Document | Window | HTMLElement | Object, event: string, args?: PlainObject): ComponentProxy {
		if (isFunction(target) && (target as any).$isEventBus)
			EventBus.emit(event, args);
		else if (isFunction((target as HTMLElement).dispatchEvent)) {
			const e = document.createEvent("Event") as any;
			e.initEvent(event, true, true);
			e.args = isPlainObject(args) ? args : {};
			(target as HTMLElement).dispatchEvent(e);
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
	bind(target: Document | Window | HTMLElement | GenericStorageInterface | Object, event: string, listener: EventProxyListener): ComponentProxy {
		const targetId = (target as any)._cpti = (target as any)._cpti || getGuid();
		const eventId = targetId + "-" + event;
		const proxy = this.proxyRegistry.bindProxy(eventId, listener);
		const id = eventId + "-" + proxy._eventProxyListenerId;
		
		if (isFunction(target) && (target as any).$isEventBus)
			EventBus.bind(event, proxy);
		else if (isObject(target) && (target as GenericStorageInterface).$isWatchable === true)
			(target as GenericStorageInterface).watch(event, proxy);
		else if (isFunction((target as HTMLElement).addEventListener)) {
			
			// Special event handling for @mutation
			if (event === "@mutation") {
				if (!this.mutationTargets.has(targetId)) {
					const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
						this.emit(target, event, {mutations, observer});
					});
					observer.observe(
						target as any,
						{attributes: true, childList: true, characterData: true, subtree: true}
					);
					this.mutationTargets.set(targetId, observer);
				}
			}
			
			(target as HTMLElement).addEventListener(event, proxy);
			
		} else throw new Error("Could not bind to event \"" + event + "\", because the given target is invalid!");
		
		// Create internal binding
		if (!this.events.has(id)) {
			this.events.set(id, {
				target: target,
				listener: listener,
				event: event
			});
		}
		
		return this;
	}
	
	/**
	 * Removes a given listener from a certain event
	 * @param target The target to unbind the listener from. Either a html element, the document or the EventBus class
	 * @param event The event to unbind or @mutation if a mutation observer is used
	 * @param listener The listener which should be unbound for the given event
	 */
	unbind(target: Document | Window | HTMLElement | GenericStorageInterface | Object, event: string, listener: EventProxyListener): ComponentProxy {
		const targetId = (target as any)._cpti = (target as any)._cpti || getGuid();
		const eventId = targetId + "-" + event;
		const proxy = this.proxyRegistry.bindProxy(eventId, listener);
		const id = eventId + "-" + proxy._eventProxyListenerId;
		
		// Unbind mutation listeners if there are no events for it anymore
		if (event === "@mutation" && this.mutationTargets.has(targetId)) {
			this.mutationTargets.get(targetId).disconnect();
			this.mutationTargets.delete(targetId);
			return this;
		}
		
		// Execute the unbinding
		if (isFunction(target) && (target as any).$isEventBus)
			EventBus.unbind(event, proxy);
		else if (isObject(target) && (target as GenericStorageInterface).$isWatchable === true)
			(target as GenericStorageInterface).unwatch(event, proxy);
		else if (isFunction((target as HTMLElement).removeEventListener))
			(target as HTMLElement).removeEventListener(event, proxy);
		else throw new Error("Could not bind to event \"" + event + "\", because the given target is invalid!");
		
		// Remove internal binding
		this.events.delete(id);
		
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
		this.lives = false;
		
		// Intervals
		if (this.intervals.length > 0)
			forEach(this.intervals, i => clearInterval(i));
		
		// Timeouts
		if (this.timeouts.length > 0)
			forEach(this.timeouts, t => clearTimeout(t));
		
		// Events
		forEach(this.events, binding => {
			this.unbind(binding.target, binding.event, binding.listener);
		});
		
		// Proxies
		this.proxyRegistry.destroy();
		
		// Remove my properties
		delete this.proxyRegistry;
		delete this.intervals;
		delete this.timeouts;
		delete this.thisContext;
		delete this.mutationTargets;
		delete this.lives;
		
		return this;
	}
	
	/**
	 * Returns true if this proxy is destroyed, false if not
	 */
	isDestroyed(): boolean {
		return !this.lives;
	}
}