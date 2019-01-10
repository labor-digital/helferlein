/**
 * Created by Martin Neundorfer on 17.10.2018.
 * For LABOR.digital
 */
import {Breakpoint} from "./Entities/Breakpoint";

export interface BreakpointsConfigureOptions {
	/**
	 * Configure the container selector to create the breakpoint marker in (DEFAULT: 'body')
	 */
	container?:string;

	/**
	 * The html template to append to the breakpointContainer (DEFAULT: '<div class="sassy-breakpoint-service"></div>')
	 */
	template?:string;

}

export interface BreakpointServiceChangeEvent extends Event {
	/**
	 * The previous breakpoint
	 */
	old:Breakpoint;

	/**
	 * The new breakpoint
	 */
	new:Breakpoint;
}