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

import {asArray} from "../FormatAndConvert/asArray";
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {isPlainObject} from "../Types/isPlainObject";
import {isString} from "../Types/isString";
import {isUndefined} from "../Types/isUndefined";

export class EventEmitterEvent {
	public name: string;
	public args: PlainObject;
	public isPropagationStopped: boolean;
	
	constructor(name, args) {
		this.name = name;
		this.args = args;
		this.isPropagationStopped = false;
	}
	
	public stopPropagation() {
		this.isPropagationStopped = true;
	}
}

export interface EventEmitterEventListener {
	(evt: EventEmitterEvent | any): void | any;
}

export interface EventEmitterCallbackEventListener {
	(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any): void;
}

export class EventEmitter {
	/**
	 * The list of events that are registered in this emitter
	 */
	protected events: PlainObject;
	
	/**
	 * If true the emitter will emit the event as callback and not using the event object
	 */
	protected emitAsCallback: boolean;
	
	/**
	 * Constructor
	 *
	 * @param emitAsCallback If set to true, the callbacks will receive the arguments as function arguments, instead of a single event object
	 */
	constructor(emitAsCallback?: boolean) {
		this.events = {};
		this.emitAsCallback = emitAsCallback === true;
	}
	
	/**
	 * Emits a given event which has the option to pass additional arguments.
	 * @param event
	 * @param args
	 */
	emit(event: string, args?: PlainObject): EventEmitter {
		if (isUndefined(this.events[event])) return this;
		if (this.emitAsCallback) {
			// Emit as callback -> Expand the arguments
			forEach(this.events[event], listener => {
				listener(...asArray(args));
			});
		} else {
			// Emit default
			const e = new EventEmitterEvent(event, isPlainObject(args) ? args : {});
			forEach(this.events[event], listener => {
				listener(e);
				if (e.isPropagationStopped) return false;
			});
		}
		return this;
	}
	
	/**
	 * Binds a given listener to a certain event
	 * @param event
	 * @param listener
	 */
	bind(event: string, listener: EventEmitterEventListener | EventEmitterCallbackEventListener): EventEmitter {
		if (isUndefined(this.events[event])) this.events[event] = [];
		this.events[event].push(listener);
		return this;
	}
	
	/**
	 * Removes a given listener from a certain event
	 * @param event
	 * @param listener
	 */
	unbind(event: string, listener: EventEmitterEventListener | EventEmitterCallbackEventListener): EventEmitter {
		if (isUndefined(this.events[event])) return this;
		const idx = this.events[event].indexOf(listener);
		if (idx > -1) this.events[event].splice(idx, 1);
		if (this.events[event].length === 0) this.events[event] = undefined;
		return this;
	}
	
	/**
	 * Unbinds either all listeners of a single event, or all listeners for all events
	 * @param event
	 */
	unbindAll(event?: string): EventEmitter {
		if (!isString(event)) this.events = {};
		else delete this.events[event];
		return this;
	}
}