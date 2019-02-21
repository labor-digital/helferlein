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

import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {getGuid} from "../Misc/getGuid";
import {isFunction} from "../Types/isFunction";
import {isPlainObject} from "../Types/isPlainObject";
import {isUndefined} from "../Types/isUndefined";
import {EventBus, EventBusEvent} from "./EventBus";

export interface ComponentProxyEventListener {
	/**
	 * A unique id for this event listener which is set internally
	 */
	_cpid?: string;

	apply: any;

	(evt: Event | EventBusEvent | any): void | any;
}

export interface ComponentProxyEventListenerProxy extends ComponentProxyEventListener {
	/**
	 * If this is true, this listener is already a proxy
	 */
	_cpep?: boolean;
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
	 * The list of all registered targets by id, events by name and all registered proxies by handler id
	 */
	protected eventListeners: Map<string, Map<string, Map<string, Array<ComponentProxyEventListenerProxy>>>>;

	/**
	 * A list of targetId => targetObject references to unbind the elements on
	 */
	protected eventTargets: Map<string, any>;

	/**
	 * A list of targetId => MutationObserver references to handle @mutation events
	 */
	protected mutationTargets: Map<string, MutationObserver>;

	constructor(thisContext) {
		this.lives = true;
		this.thisContext = thisContext;
		this.timeouts = [];
		this.intervals = [];
		this.eventListeners = new Map();
		this.eventTargets = new Map();
		this.mutationTargets = new Map();
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
	 * 				any changes of the dom and call the listener on it
	 * @param listener The listener which is called when the event is emitted on the given target
	 */
	bind(target: Document | Window | HTMLElement | Object, event: string, listener: ComponentProxyEventListener): ComponentProxy {
		const proxy = this.makeEventHandlerProxy(listener);
		const targetId = (target as any)._cpti = (target as any)._cpti || getGuid();
		if (isFunction(target) && (target as any).$isEventBus)
			EventBus.bind(event, proxy);
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

		// Store the proxy
		const proxyId = proxy._cpid;
		if (!this.eventListeners.has(targetId)) {
			this.eventListeners.set(targetId, new Map());
			this.eventTargets.set(targetId, target);
		}
		const t = this.eventListeners.get(targetId);
		if (!t.has(event)) t.set(event, new Map());
		const t2 = t.get(event);
		if (!t2.has(proxyId)) t2.set(proxyId, []);
		t2.get(proxyId).push(proxy);

		return this;
	}

	/**
	 * Removes a given listener from a certain event
	 * @param target The target to unbind the listener from. Either a html element, the document or the EventBus class
	 * @param event The event to unbind or @mutation if a mutation observer is used
	 * @param listener The listener which should be unbound for the given event
	 */
	unbind(target: Document | Window | HTMLElement | Object, event: string, listener: ComponentProxyEventListener): ComponentProxy {
		const targetId = (target as any)._cpti;
		const proxyId = listener._cpid;

		// Clean up our internal storage
		const listenersToUnbind = [];
		if (this.eventListeners.has(targetId)) {
			const targetList = this.eventListeners.get(targetId);
			if (targetList.has(event)) {
				const eventList = targetList.get(event);
				if (eventList.has(proxyId)) {
					eventList.get(proxyId).forEach((proxy) => listenersToUnbind.push(proxy));
					eventList.delete(proxyId);
				}
				if (eventList.size === 0) {
					// Free up memory
					targetList.delete(event);

					// Unbind mutaton listeners if there are no events for it anymore
					if (event === "@mutation" && this.mutationTargets.has(targetId)) {
						this.mutationTargets.get(targetId).disconnect();
						this.mutationTargets.delete(targetId);
					}
				}
			}
			if (targetList.size === 0) {
				// Free up memory
				this.eventListeners.delete(targetId);
				this.eventTargets.delete(targetId);
			}
		}

		// Handle listeners which were not registered over this proxy
		if (listenersToUnbind.length === 0)
			listenersToUnbind.push(listener);

		// Execute the unbinding
		if (isFunction(target) && (target as any).$isEventBus) {
			for (let i = 0; i < listenersToUnbind.length; i++)
				EventBus.bind(event, listenersToUnbind[i]);
		} else if (isFunction((target as HTMLElement).removeEventListener)) {
			for (let i = 0; i < listenersToUnbind.length; i++)
				(target as HTMLElement).removeEventListener(event, listenersToUnbind[i]);
		} else throw new Error("Could not bind to event \"" + event + "\", because the given target is invalid!");

		return this;
	}

	protected makeEventHandlerProxy(handler: ComponentProxyEventListener | ComponentProxyEventListenerProxy): ComponentProxyEventListenerProxy {
		// Skip if this is already a proxy
		if ((handler as ComponentProxyEventListenerProxy)._cpep === true) return handler;

		// Create or use handler id
		const id = handler._cpid = handler._cpid || getGuid();

		// Create a new proxy
		const thisContext = this.thisContext;
		const proxy: ComponentProxyEventListenerProxy = function () {
			handler.apply(thisContext, Array.prototype.slice.call(arguments));
		};
		proxy._cpid = id;
		proxy._cpep = true;

		// Done
		return proxy;
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
		if (this.eventListeners.size > 0)
			forEach(this.eventListeners, (targetList, targetId) => {
				const target = this.eventTargets.get(targetId);
				forEach(targetList, (eventList, event) => {
					forEach(eventList, (proxyList) => {
						this.unbind(target, event, proxyList[0]);
					});
				});
			});

		// Remove my properties
		delete this.intervals;
		delete this.timeouts;
		delete this.eventListeners;
		delete this.eventTargets;
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