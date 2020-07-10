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
 * Last modified: 2019.01.10 at 13:43
 */
import {Breakpoint} from './Entities/Breakpoint';

export interface BreakpointsConfigureOptions
{
    /**
     * Configure the container selector to create the breakpoint marker in (DEFAULT: 'body')
     */
    container?: string;
    
    /**
     * The html template to append to the breakpointContainer (DEFAULT: '<div class="sassy-breakpoint-service"></div>')
     * This element should hold the css configuration of the breakpoints in its font-face definition.
     * If you provide a nested element like <div ...><div ...><div class="foo"></div></div></div> make sure
     * to add a "inTemplateSelector" to select your child element you want to use as breakpoint bearer
     */
    template?: string;
    
    /**
     *  If given the service will try to find an element with this selector inside the template element
     * instead of getting the css rules from the element itself.
     */
    inTemplateSelector?: string;
    
}

export interface BreakpointServiceChangeEvent extends Event
{
    /**
     * The previous breakpoint
     */
    old: Breakpoint;
    
    /**
     * The new breakpoint
     */
    new: Breakpoint;
}