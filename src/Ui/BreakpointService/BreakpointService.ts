/**
 * Created by Martin Neundorfer on 10.01.2019.
 * For LABOR.digital
 */
import {BreakpointHelpers} from "./BreakpointHelpers";
import {throttleEvent} from "../throttleEvent";
import {BreakpointContext} from "./Entities/BreakpointContext";
import {BreakpointsConfigureOptions, BreakpointServiceChangeEvent} from "./BreakpointService.interfaces";
import {onReady} from "../../Dom/onReady";
import {Breakpoint} from "./Entities/Breakpoint";

// Create new context
const context = new BreakpointContext();

// Listen to window resizes
onReady(() => {
	BreakpointHelpers.ensureCurrent(context);
	window.addEventListener("resize", throttleEvent(function breakpointWindowOnResizeHandler() {
		// Store old breakpoint
		const oldBreakpoint = context.current;

		// Recalculate current breakpoint
		context.current = null;
		BreakpointHelpers.calculateCurrentBreakpoint(context);

		// Skip if the breakpoint did not change
		if (oldBreakpoint === context.current) return;

		// Trigger global event
		const e = document.createEvent("Event") as BreakpointServiceChangeEvent;
		e.initEvent("breakpoint__change", true, true);
		e.new = context.current;
		e.old = oldBreakpoint;
		window.dispatchEvent(e);
	}, 200));
});

/**
 * This class utilizes the css to javascript breakpoint service provided by the "@labor/sassy" package
 * to create a breakpoint api in javascript which is configured in css.
 *
 * If you don't want to use the sassy library, but still want access to this api you have
 * to create a css class that defines a "font-family" with a value like the following:
 * font-family: "xxs: 0|449px, xs: 0|549px, sm: 550px|767px, md: 768px|991px, lg: 992px|1199px, xl: 1200px|999999px";
 *
 * The key is the name of the breakpoint, the first number is the "min" value of the breakpoint, the second (after the pipe)
 * the "max" value of the breakpoint
 */
export class BreakpointService {
	/**
	 * Checks if the current breakpoint which was configured using its css counterpart of bootstrap-addons
	 * is (bigger, smaller, the same, not) as a given other breakpoint key ("sm", "lg"...)
	 *
	 * To add your own breakpoints take a look at the "$js-breakpoints" variable in config.sass
	 *
	 * @param comparator The operator to use for the comparison
	 * @param breakpointKey The other breakpoint to compare with the current one
	 */
	static bpIs(comparator: "<=" | "==" | ">=" | ">" | "<" | "!=", breakpointKey: string): boolean {
		BreakpointHelpers.ensureCurrent(context);
		// Skip if there are no configured breakpoints
		if (context.current === null) return false;

		// Kill if there was an invalid breakpoint
		if (!context.breakpoints.has(breakpointKey))
			throw new Error("Request for unknown breakpoint: " + breakpointKey);

		// Compare
		const compareId: number = context.breakpoints.get(breakpointKey).id;
		const currentId = context.current.id;

		switch (comparator) {
			case ">":
				return currentId > compareId;
			case "<":
				return currentId < compareId;
			case ">=":
				return currentId >= compareId;
			case "<=":
				return currentId <= compareId;
			case "==":
				return currentId === compareId;
			case "!=":
				return currentId !== compareId;
		}

		return false;
	}

	/**
	 * Returns the current breakpoint or null, if there is no
	 * breakpoint definition
	 */
	static getCurrent(): null | Breakpoint {
		BreakpointHelpers.ensureCurrent(context);
		return context.current;
	}

	/**
	 * Returns the list of all found breakpoints or null, if there are none
	 */
	static getAll(): null | Map<string, Breakpoint> {
		BreakpointHelpers.readBreakpoints(context);
		return context.breakpoints;
	}

	/**
	 * Can be used to customize the settings for the breakpoint service
	 * @param opts
	 * 			- container: The container selector to create the breakpoint marker in (DEFAULT: 'body')
	 * 			- template: The html template to append to the breakpointContainer (DEFAULT: '<div class="sassy-breakpoint-service"></div>')
	 */
	static configure(opts: BreakpointsConfigureOptions): BreakpointService {
		// Reset current and breakpoints
		context.breakpoints = null;
		context.current = null;

		// Apply options
		if (typeof opts.container === "string") context.container = opts.container;
		if (typeof opts.template === "string") context.template = opts.template;

		return this;
	}
}