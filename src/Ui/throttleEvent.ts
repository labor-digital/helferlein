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
 * Last modified: 2019.01.25 at 11:48
 */

import type {PlainObject} from '../Interfaces/PlainObject';

export interface ThrottleEventWrapper extends Function
{
    /**
     * If you need to cancel a scheduled throttle, you can call .cancel() on the throttled function.
     */
    cancel?: Function;
}

export interface ThrottledEventHandler extends Function
{

}

/**
 * Helper to throttle (debounce) js events
 * The source code is mostly stolen from:
 * @see https://github.com/jashkenas/underscore/blob/master/underscore.js
 * Underscore.js 1.9.1
 * http://underscorejs.org
 * (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
export function throttleEvent(callback: ThrottledEventHandler, limit: number): any
{
    var timeout: number | null | any;
    let context: any;
    let args: PlainObject | null;
    let result: any;
    let previous = 0;
    
    var later = function () {
        previous = new Date().getTime();
        timeout = null;
        result = callback.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };
    
    var throttled: ThrottleEventWrapper = function throttleEventWrapper() {
        args = arguments;
        var now = new Date().getTime();
        if (!previous) {
            previous = now;
        }
        var remaining = limit - (now - previous);
        // @ts-ignore
        context = this;
        
        if (remaining <= 0 || remaining > limit) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = callback.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    
    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };
    
    return throttled;
}