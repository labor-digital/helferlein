/**
 * Created by Martin Neundorfer on 17.01.2019.
 * For LABOR.digital
 */
import {PlainObject} from "../Interfaces/PlainObject";
import {isPlainObject} from "../Types/isPlainObject";
import {md5} from "../Misc/md5";
import {isFunction} from "../Types/isFunction";

const namespace = (new Date()).toTimeString() + "-" + Math.random() * Math.random();
const eventNameCache = new Map();

interface EventBusEvent extends Event {
	args: PlainObject
}

interface EventBusEventListener {
	(evt: EventBusEvent): void;
}

/**
 * This class is used for all helferlein events to prevent contamination of the global event system
 *
 */
export class EventBus {

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
	 * Registeres a special event handler which is called as soon as the document reports to be ready.
	 * If this is called after the document is ready, the handler will be executed immediately
	 * @param handler
	 */
	static bindOnReady(handler: Function){
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
	protected static makeInternalEventName(event:string):string {
		if(eventNameCache.has(event)) return eventNameCache.get(event);
		const eventName = "helferlein-event-" + md5(namespace + "-" + event);
		eventNameCache.set(event, eventName);
		return eventName;
	}
}