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
 * Last modified: 2019.04.01 at 08:58
 */

import {EventBusEvent} from "../Browser/EventBus";
import {forEach} from "../Lists/forEach";
import {getGuid} from "../Misc/getGuid";
import {isFunction} from "../Types/isFunction";

export interface EventProxyListener extends Function {
	/**
	 * A unique id for this event listener which is set internally
	 */
	_eventProxyListenerId?: string;
	
	apply: any;
	
	(evt: Event | EventBusEvent | any): void | any;
}

export interface EventProxyListenerProxy extends EventProxyListener {
	/**
	 * If this is true, this listener is already a proxy
	 */
	_isEventProxyProxy?: boolean;
}

export interface EventProxyGenerator {
	(thisContext): EventProxyListenerProxy;
}

/**
 * The basic framework to create and manage event listener proxies.
 * Each proxy's this context will be scoped to the thisContext supplied in the constructor.
 * It manages duplicate listener bindings on the same event and prevent memory leaks
 * by detecting deleted proxies
 */
export class EventProxyRegistry {
	/**
	 * The component which is used as this context inside the proxy instance
	 */
	protected thisContext: any;
	
	/**
	 * The list of all proxies we have registered internally
	 */
	protected proxyList: Map<string, EventProxyListenerProxy>;
	
	/**
	 * A list of listener id's by their events to keep track of the usage count
	 */
	protected proxyEventList: Map<string, Array<string>>;
	
	/**
	 * A list of all listener id
	 */
	protected listenerUsage: Map<string, number>;
	
	/**
	 * Registers this context on the object
	 * @param thisContext
	 */
	constructor(thisContext) {
		this.thisContext = thisContext;
		this.proxyList = new Map();
		this.proxyEventList = new Map();
		this.listenerUsage = new Map();
	}
	
	/**
	 * Returns a proxy function which is bound to the given event
	 *
	 * @param event The event / a unique key for a target + event combination the listener is registered to.
	 *                Acts as a namespace to allow multiple listener registrations
	 * @param listener The listener to create the proxy for
	 * @param proxyGenerator Advanced input to manually create the proxy function instead of using the default implementation
	 */
	public bindProxy(event: string, listener: EventProxyListener | EventProxyListenerProxy, proxyGenerator?: EventProxyGenerator): EventProxyListenerProxy {
		const proxy = this.getProxyFor(listener, proxyGenerator);
		const listenerId = proxy._eventProxyListenerId;
		
		// Register this proxy for the given event
		if (!this.proxyEventList.has(event)) this.proxyEventList.set(event, []);
		this.proxyEventList.get(event).push(listenerId);
		
		// Count up the usage of this listener, so we can remove the proxy if we don't use it anymore
		if (!this.listenerUsage.has(listenerId)) this.listenerUsage.set(listenerId, 0);
		this.listenerUsage.set(listenerId, this.listenerUsage.get(listenerId) + 1);
		
		// Done
		return proxy;
	}
	
	/**
	 * Removes the given listener / proxy from an event
	 * Performs internal cleanup actions if required
	 *
	 * @param event
	 * @param listener
	 */
	public unbindProxy(event: string, listener: EventProxyListener | EventProxyListenerProxy): EventProxyListenerProxy | any {
		// Skip if this is not a proxy, nor a listener
		if (typeof listener._eventProxyListenerId === "undefined" || typeof (listener as EventProxyListenerProxy)._isEventProxyProxy === "undefined")
			return listener;
		
		// Create proxy
		const proxy = this.getProxyFor(listener);
		const listenerId = proxy._eventProxyListenerId;
		
		// Prepare usage for down counting
		let usages = this.listenerUsage.has(listenerId) ? this.listenerUsage.get(listenerId) : 0;
		
		// Remove all instances of this proxy on the given event
		if (this.proxyEventList.has(event)) {
			const proxiesFiltered = [];
			forEach(this.proxyEventList.get(event), v => {
				if (v === listenerId) {
					--usages;
					return;
				}
				proxiesFiltered.push(v);
			});
			this.proxyEventList.set(event, proxiesFiltered);
			// Remove the event if it is empty now
			if (this.proxyEventList.get(event).length === 0)
				this.proxyEventList.delete(event);
		}
		
		// Update usages / destroy proxy if required
		if (usages <= 0) {
			this.listenerUsage.delete(listenerId);
			this.proxyList.delete(listenerId);
		} else {
			this.listenerUsage.set(listenerId, usages);
		}
		
		// Done
		return proxy;
	}
	
	/**
	 * Returns true if there are currently proxies for the given event, false if not
	 * @param event
	 */
	public hasProxiesFor(event: string): boolean {
		return this.proxyEventList.has(event) && this.proxyEventList.get(event).length > 0;
	}
	
	/**
	 * Clean up the internal storage
	 * and flush memory usage
	 */
	public destroy() {
		this.proxyList.forEach((v, k) => {
			this.proxyList.delete(k);
		});
		delete this.proxyList;
		this.listenerUsage.forEach((v, k) => {
			this.listenerUsage.delete(k);
		});
		delete this.listenerUsage;
		this.proxyEventList.forEach((v, k) => {
			this.proxyEventList.delete(k);
		});
		delete this.proxyEventList;
		delete this.thisContext;
	}
	
	/**
	 * Internal helper to convert a given listener into a listener proxy
	 *
	 * @param listener
	 * @param proxyGenerator
	 */
	protected getProxyFor(listener: EventProxyListener | EventProxyListenerProxy, proxyGenerator?: EventProxyGenerator): EventProxyListenerProxy {
		// Skip if this is already a proxy (And known in this registry -> otherwise we will create a proxy of a proxy)
		if ((listener as EventProxyListenerProxy)._isEventProxyProxy === true &&
			this.proxyList.has(listener._eventProxyListenerId)) return this.proxyList.get(listener._eventProxyListenerId) as EventProxyListenerProxy;
		
		// Create or use listener id
		const listenerId = listener._eventProxyListenerId = listener._eventProxyListenerId || getGuid("listener");
		if (this.proxyList.has(listenerId)) return this.proxyList.get(listenerId);
		
		// Create new proxy
		const thisContext = this.thisContext;
		const proxy: EventProxyListenerProxy =
			isFunction(proxyGenerator) ? proxyGenerator(this.thisContext) :
				function () {
					listener.apply(thisContext, Array.prototype.slice.call(arguments));
				};
		proxy._isEventProxyProxy = true;
		proxy._eventProxyListenerId = listenerId;
		this.proxyList.set(listenerId, proxy);
		
		// Done
		return proxy;
	}
	
}