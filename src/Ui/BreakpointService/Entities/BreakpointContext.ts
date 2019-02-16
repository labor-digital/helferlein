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
 * Last modified: 2019.01.10 at 13:41
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