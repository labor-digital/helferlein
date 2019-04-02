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
 * Last modified: 2019.01.23 at 13:16
 */
import {PlainObject} from "../Interfaces/PlainObject";
import {md5} from "../Misc/md5";
import {isFunction} from "../Types/isFunction";
import {isPlainObject} from "../Types/isPlainObject";

const namespace = (new Date()).toTimeString() + "-" + Math.random() * Math.random();
const eventNameCache = new Map();

export interface EventBusEvent extends Event {
	args: PlainObject
}

export interface EventBusEventListener {
	(evt: EventBusEvent | any): void | any;
}

/**
 * This class is used for all helferlein events to prevent contamination of the global event system
 *
 */
export class EventBus {
	
	/**
	 * Marker to let other helpers know, that this is an event bus interface
	 */
	static $isEventBus: true;
	
	/**
	 * Emits a given event which has the option to pass additional arguments.
	 * @param event
	 * @param args
	 */
	static emit(event: string, args?: PlainObject): EventBus {
		const e = document.createEvent("Event") as any;
		e.initEvent(EventBus.makeInternalEventName(event), true, true);
		e.args = isPlainObject(args) ? args : {};
		document.dispatchEvent(e);
		return EventBus;
	}
	
	/**
	 * Binds a given handler to a certain event
	 * @param event
	 * @param handler
	 */
	static bind(event: string, handler: EventBusEventListener): EventBus {
		document.addEventListener(EventBus.makeInternalEventName(event), handler);
		return EventBus;
	}
	
	/**
	 * Removes a given handler from a certain event
	 * @param event
	 * @param handler
	 */
	static unbind(event: string, handler: EventBusEventListener): EventBus {
		document.removeEventListener(EventBus.makeInternalEventName(event), handler);
		return EventBus;
	}
	
	/**
	 * Registers a special event handler which is called as soon as the document reports to be ready.
	 * If this is called after the document is ready, the handler will be executed immediately
	 * @param handler
	 */
	static bindOnReady(handler: Function) {
		if (document.readyState !== "loading") handler();
		else if (document.addEventListener) document.addEventListener("DOMContentLoaded", handler as any);
		else if (isFunction((document as any).attachEvent)) (document as any).attachEvent("onreadystatechange", function () {
			if (document.readyState == "complete") handler();
		});
		else handler();
	}
	
	/**
	 * Scopes the given event into a namespaced, event which should not interfere with other events or EventBuses
	 * @param event
	 */
	protected static makeInternalEventName(event: string): string {
		if (eventNameCache.has(event)) return eventNameCache.get(event);
		const eventName = "helferlein-event-" + md5(namespace + "-" + event);
		eventNameCache.set(event, eventName);
		return eventName;
	}
}

EventBus.$isEventBus = true;