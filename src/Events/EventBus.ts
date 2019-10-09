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
 * Last modified: 2019.04.02 at 13:15
 */
import {PlainObject} from "../Interfaces/PlainObject";
import {EventEmitter, EventEmitterEventListener} from "./EventEmitter";

const emitter = new EventEmitter();

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
	static emit(event: string, args?: PlainObject): void {
		emitter.emit(event, args);
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
	 * @see EventEmitter.emitHook()
	 */
	static emitHook(event: string | Array<string>, args: PlainObject): Promise<PlainObject> {
		return emitter.emitHook(event, args);
	}
	
	/**
	 * Binds a given listener to a certain event
	 * @param event
	 * @param listener
	 * @param priority Default: 0, the lower the number, the earlier the execution. May be a negative value!
	 */
	static bind(event: string, listener: EventEmitterEventListener, priority?: number): void {
		emitter.bind(event, listener);
	}
	
	/**
	 * Removes a given listener from a certain event
	 * @param event
	 * @param listener
	 */
	static unbind(event: string, listener: EventEmitterEventListener): void {
		emitter.unbind(event, listener);
	}
	
	/**
	 * Unbinds either all listeners of a single event, or all listeners for all events
	 * @param event
	 */
	static unbindAll(event?: string): void {
		emitter.unbindAll(event);
	}
	
	/**
	 * Returns the instance of the internal event emitter
	 */
	static getEmitter(): EventEmitter {
		return emitter;
	}
}