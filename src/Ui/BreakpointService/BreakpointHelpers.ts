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
 * Last modified: 2019.01.18 at 20:09
 */

import {BreakpointContext} from "./Entities/BreakpointContext";
import {Breakpoint} from "./Entities/Breakpoint";
import {forEach} from "../../Lists/forEach";
import {isNull} from "../../Types/isNull";

/**
 * Created by Martin Neundorfer on 17.10.2018.
 * For LABOR.digital
 */
export class BreakpointHelpers {

	/**
	 * Makes sure that context.current is set.
	 * It will also try to load context.breakpoints if they are empty
	 *
	 * @param context
	 */
	static ensureCurrent(context: BreakpointContext): void {
		if(!isNull(context.current)) return;
		BreakpointHelpers.readBreakpoints(context);
		BreakpointHelpers.calculateCurrentBreakpoint(context);
	}

	/**
	 * Reads the css breakpoint definition using a custom marker element which is
	 * added to the dom tree for a short moment to read the breakpoint definition of the "font-family"
	 * css attribute. The given string will then be parsed as list of breakpoint objects.
	 *
	 * @param context
	 */
	static readBreakpoints(context: BreakpointContext): void {
		if (!isNull(context.breakpoints)) return;

		// Add the template to the container
		const container = document.querySelector(context.container);
		const tplWrapper = document.createElement("div");
		tplWrapper.innerHTML = context.template;
		const tpl = tplWrapper.firstChild as HTMLElement;
		container.appendChild(tpl);
		const breakpointDefinition = window.getComputedStyle(tpl).fontFamily;
		container.removeChild(tpl);

		// Parse breakpoints if possible
		if (breakpointDefinition.indexOf(":") === -1) return;
		const breakpoints = new Map();
		forEach(breakpointDefinition.replace(/"/g, "").split(/,/), (singleBreakpoint, id:number) => {
			singleBreakpoint
				.trim()
				.replace(/^(.*?):(?:[^\d]*?)(\d*?)(?:[^\d|]*?)\|(?:[^\d|]*?)(\d*?)(?:[^\d]*?)$/, (a, key, min, max) => {
					breakpoints.set(key, new Breakpoint(id, key, parseInt(min), parseInt(max)))
				});
		});

		// Done
		context.breakpoints = breakpoints.size === 0 ? null : breakpoints;
	}

	/**
	 * Iterates over the currently loaded breakpoints and tries to find
	 * the first matching one for the current window width.
	 * @param context
	 */
	static calculateCurrentBreakpoint(context: BreakpointContext): void {
		if(!isNull(context.current)) return;
		if(isNull(context.breakpoints)) BreakpointHelpers.readBreakpoints(context);

		forEach(context.breakpoints, (breakpoint:Breakpoint) => {
			// Skip if min is bigger than window width
			if(breakpoint.min > window.innerWidth) return;
			// Skip if max is smaller than window width
			if(breakpoint.max < window.innerWidth) return;

			// Found
			context.current = breakpoint;
			return false;
		});
	}

}