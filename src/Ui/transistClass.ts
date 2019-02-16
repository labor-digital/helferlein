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
 * Last modified: 2019.02.01 at 14:10
 */
import {isString} from "../Types/isString";
import {isPlainObject} from "../Types/isPlainObject";
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {requestFrame} from "../Browser/requestFrame";
import {removeClass} from "../Dom/removeClass";
import {throttleEvent} from "./throttleEvent";
import {addClass} from "../Dom/addClass";

// The number of milliseconds for each frame / tick
const tickLength = 15;

let guid = 0;
const runningTransitions = new Map();

export interface TransistClassOptions {

	/**
	 * If set this class will be set at the second tick/frame to add your own fancy transitions
	 */
	targetClass?: string

	/**
	 * If this is set, this class / classes will be removed on the last tick/frame of the transition
	 */
	removeClass?: string

	/**
	 * The prefix before the class definition
	 * Default: h
	 */
	prefix?: string

	/**
	 * The type of transition you want to use
	 * Default: enter
	 */
	type?: string

	/**
	 * By default multiple transitions cancel each other out
	 * If you don't want to interfere with already running transactions set this to false
	 */
	cancelOthers?: boolean
}

/**
 * This helper can be used to create nice css transitions.
 * The general idea is stolen from https://vuejs.org/v2/guide/transitions.html#Transition-Classes
 * but without the limitation on vue js / the forced usage on v-if therefore.
 *
 * The rest is basically the same. You define a dom element and a duration
 * (how long your animation should take -> we do not parse your css for the animation length)
 *
 * First we add a class called h-enter and a class called h-enter-active. After one tick/frame
 * the h-enter class will be removed and only the h-enter-active class remains until the duration is up.
 * After that both classes will be removed again.
 *
 * In addition to that you can set a "targetClass" which is added in the same frame when the
 * h-enter class is removed from the element.
 * Finally you can specify a "removeClass" which is removed on the last frame/tick of the transition
 * @param element
 * @param duration
 * @param options
 */
export function transistClass(element: HTMLElement, duration: number, options?: TransistClassOptions): Promise<HTMLElement> {
	return new Promise(resolve => {
		if (!isPlainObject(options)) options = {};

		// Prepare internal markers
		const eGuid = (element as any)._transitionGuid = (element as any)._transitionGuid || ++guid;
		const ticks = Math.floor(duration / tickLength);
		let c = 0;

		// Cancel running transitions
		const context = {cancel: false};
		const contextList: Array<PlainObject> = runningTransitions.has(eGuid) ? runningTransitions.get(eGuid) : [];
		if (options.cancelOthers !== false && contextList.length > 0) {
			forEach(contextList, c => c.cancel = true);
		}
		contextList.push(context);
		runningTransitions.set(eGuid, contextList);

		// Prepare classes
		const classPrefix = isString(options.prefix) ? options.prefix : "h";
		const type = isString(options.type) ? options.type : "enter";
		const targetClass = isString(options.targetClass) ? options.targetClass : "";
		const classToRemove = isString(options.removeClass) ? options.removeClass : "";
		const activeClass = classPrefix + "-" + type + "-active";
		const enterClass = classPrefix + "-" + type;

		const tick = function () {
			// Check if we were canceled
			if (c > 1 && context.cancel === true) {
				removeClass(element, enterClass + " " + activeClass + " " + classToRemove);
				return resolve(element);
			}

			if (c < ticks) {
				requestFrame(throttleEvent(tick, tickLength));
				if (c === 0) {
					addClass(element, enterClass + " " + activeClass);
				} else if (c === 1) {
					removeClass(element, enterClass);
					if (targetClass !== "") addClass(element, targetClass);
				}
			} else {
				// Clean up
				removeClass(element, enterClass + " " + activeClass + " " + classToRemove);
				delete (element as any)._transitionGuid;
				runningTransitions.delete(eGuid);
				return resolve(element);
			}
			c++;
		};

		tick();
	})
}