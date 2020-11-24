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
 * Last modified: 2019.02.06 at 17:56
 */
import {
    Breakpoint,
    BreakpointsConfigureOptions,
    EventBus,
    HelferleinEventList,
    isBrowser,
    onDomReady,
    throttleEvent
} from '../..';
import {BreakpointHelpers} from './BreakpointHelpers';
import {BreakpointContext} from './Entities/BreakpointContext';

// Create new context
const context = new BreakpointContext();

// Only do this if we are running in a browser
if (isBrowser()) {
    
    // Listen to window resize
    onDomReady(() => {
        BreakpointHelpers.ensureCurrent(context);
        window.addEventListener('resize', throttleEvent(function breakpointWindowOnResizeHandler() {
            // Store old breakpoint
            const oldBreakpoint = context.current;
            
            // Recalculate current breakpoint
            context.current = null;
            BreakpointHelpers.calculateCurrentBreakpoint(context);
            
            // Skip if the breakpoint did not change
            if (oldBreakpoint === context.current) {
                return;
            }
            
            // Trigger event
            EventBus.emit(HelferleinEventList.EVENT_BREAKPOINT_CHANGE, {old: oldBreakpoint, new: context.current});
        }, 200));
    });
}

/**
 * This class utilizes the css to javascript breakpoint service provided by the "@neunerlei/sassy" package
 * to create a breakpoint api in javascript which is configured in css.
 *
 * If you don't want to use the sassy library, but still want access to this api you have
 * to create a css class that defines a "font-family" with a value like the following:
 * font-family: "xxs: 0|449px, xs: 0|549px, sm: 550px|767px, md: 768px|991px, lg: 992px|1199px, xl: 1200px|999999px";
 *
 * The key is the name of the breakpoint, the first number is the "min" value of the breakpoint, the second (after the pipe)
 * the "max" value of the breakpoint
 */
export class BreakpointService
{
    /**
     * Checks if the current breakpoint which was configured using its css counterpart of bootstrap-addons
     * is (bigger, smaller, the same, not) as a given other breakpoint key ("sm", "lg"...)
     *
     * To add your own breakpoints take a look at the "$js-breakpoints" variable in config.sass
     *
     * @param comparator The operator to use for the comparison
     * @param breakpointKey The other breakpoint to compare with the current one
     */
    static bpIs(comparator: '<=' | '==' | '>=' | '>' | '<' | '!=', breakpointKey: string): boolean
    {
        if (!isBrowser()) {
            return true;
        }
        BreakpointHelpers.ensureCurrent(context);
        // Skip if there are no configured breakpoints
        if (context.current === null) {
            return false;
        }
        
        // Compare
        return context.current.is(comparator, breakpointKey);
    }
    
    /**
     * Returns the current breakpoint or null, if there is no
     * breakpoint definition
     */
    static getCurrent(): null | Breakpoint
    {
        if (!isBrowser()) {
            return null;
        }
        BreakpointHelpers.ensureCurrent(context);
        return context.current;
    }
    
    /**
     * Returns the breakpoint instance that would be used for a given width in pixels
     * @param width the number in pixels to calculate the breakpoint for
     */
    static getForWidth(width: number): null | Breakpoint
    {
        if (!isBrowser()) {
            return null;
        }
        return BreakpointHelpers.calculateBreakpointForPixelWidth(width, context);
    }
    
    /**
     * Returns the list of all found breakpoints or null, if there are none
     */
    static getAll(): null | Map<string, Breakpoint>
    {
        if (!isBrowser()) {
            return null;
        }
        BreakpointHelpers.ensureCurrent(context);
        return context.breakpoints;
    }
    
    /**
     * Returns the definition for a single breakpoint with the given key
     * It may return null if it is called on the server side.
     * It throws an error if a non existent breakpoint key was requested
     * @param key
     */
    static getSingle(key: string): Breakpoint
    {
        if (!isBrowser()) {
            return null;
        }
        const all = this.getAll();
        if (!all.has(key)) {
            throw new Error('Request for unknown breakpoint: ' + key);
        }
        return all.get(key);
    }
    
    /**
     * Can be used to customize the settings for the breakpoint service
     * @param opts
     *            - container: The container selector to create the breakpoint marker in (DEFAULT: 'body')
     *            - template: The html template to append to the breakpointContainer (DEFAULT: '<div class="sassy-breakpoint-service"></div>')
     *            - inTemplateSelector: Can be used if multi-layered templates are required to get the correct element to read the css definition from.
     */
    static configure(opts: BreakpointsConfigureOptions)
    {
        if (!isBrowser()) {
            return;
        }
        
        // Reset current and breakpoints
        context.breakpoints = null;
        context.current = null;
        context.inTemplateSelector = null;
        
        // Apply options
        if (typeof opts.container === 'string') {
            context.container = opts.container;
        }
        if (typeof opts.template === 'string') {
            context.template = opts.template;
        }
        if (typeof opts.inTemplateSelector === 'string') {
            context.inTemplateSelector = opts.inTemplateSelector;
        }
    }
}