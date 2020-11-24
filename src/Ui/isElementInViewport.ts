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
 * Last modified: 2019.03.31 at 19:36
 */
import {isBrowser} from '../Environment/isBrowser';
import {isNumber} from '../Types/isNumber';
import {isUndefined} from '../Types/isUndefined';
import {getScrollPos} from './getScrollPos';
import {getViewportSize} from './getViewportSize';

export interface IsElementInViewportOptions
{
    /**
     * An additional offset from the top of the viewport to take into consideration
     */
    offsetTop?: number;
    
    /**
     * By default the function returns true if the element is at least partially visible
     * inside the viewport. If you set this to true the method will only return true if
     * the element is completely visible and does not collide with the outer bounds.
     */
    onlyFull?: boolean;
}

/**
 * Checks if the given element is visible inside the current viewport (any part of it)
 * @param el The element to heck for
 * @param offsetTop An additional offset to check for
 */
export function isElementInViewport(el: HTMLElement, offsetTop?: number): boolean;

/**
 * Checks if the given element is visible inside the current viewport (any part of it)
 * @param el The element to heck for
 * @param options Additional options
 */
export function isElementInViewport(el: HTMLElement, options?: IsElementInViewportOptions): boolean

export function isElementInViewport(el: HTMLElement, options?: number | IsElementInViewportOptions): boolean
{
    if (!isBrowser()) {
        return false;
    }
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const vpSize = getViewportSize();
    const scrollTop = getScrollPos();
    const scrollLeft = getScrollPos(undefined, true);
    
    while (el.offsetParent) {
        el = el.offsetParent as any;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    
    // Convert legacy values
    if (isNumber(options)) {
        options = {offsetTop: options as number};
    }
    const opt: IsElementInViewportOptions = isUndefined(options) ? {} : options as any;
    
    // Apply top offset
    top += (isNumber(opt.offsetTop) ? opt.offsetTop : 0);
    
    // Handle full collision
    const of = opt.onlyFull;
    
    // Limit Bottom
    return top + (of ? height : 0) < vpSize.height + scrollTop &&
           // Limit Right
           left + (of ? width : 0) < vpSize.width + scrollLeft &&
           // Limit Top
           top + (of ? 0 : height) > scrollTop &&
           // Limit left
           left + (of ? 0 : width) > scrollLeft;
}