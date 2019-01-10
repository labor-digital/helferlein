/**
 * Created by Martin Neundorfer on 17.10.2018.
 * For LABOR.digital
 */
import {Breakpoint} from "./Breakpoint";

export class BreakpointContext{

	/**
	 * Configure the container selector to create the breakpoint marker in (DEFAULT: 'body')
	 */
	container:string;

	/**
	 * The html template to append to the breakpointContainer (DEFAULT: '<div class="sassy-breakpoint-service"></div>')
	 */
	template:string;

	/**
	 * Holds the list of all breakpoints or null if non are defined/found
	 */
	breakpoints: null | Map<string, Breakpoint>;

	/**
	 * Holds the current, calculated breakpoint
	 */
	current: null|Breakpoint;

	constructor(){
		this.container = "body";
		this.template = "<div class=\"sassy-breakpoint-service\"></div>";
		this.breakpoints = null;
		this.current = null;
	}
}