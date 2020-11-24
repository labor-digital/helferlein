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
 * Last modified: 2019.02.01 at 15:10
 */
import {
    getOffset,
    isBool,
    isBrowser,
    isEmpty,
    isFunction,
    isNumber,
    isObject,
    isString,
    merge,
    PlainObject,
    scrollToPosition
} from '..';

interface ScrollOffsetCalculator
{
    /**
     * Receives the base offset, or 0 if set in the default configuration
     * and must return the actual offset to use
     * @param offset
     */
    (offset: number): number
}

interface ScrollToTopOfConfiguration extends PlainObject
{
    /**
     * The speed in milliseconds the scroll operation should take
     */
    duration?: number;
    
    /**
     * The offset to the top of the page when scrolling up
     * If you provide a function you can also calculate the offset dynamically,
     * which comes in handy if you want to modify the offset based on dynamic values
     */
    offset?: number | ScrollOffsetCalculator;
    
    /**
     * By default the animation is stopped when the user manually starts to interact with the scrolling.
     * If you set this to false the scrolling will continue even on interaction
     */
    breakOnManualScroll?: boolean;
    
    /**
     * If set this will be used as as scroll container instead of the "window"
     * Can be a valid selector for document.querySelector() as a string, as well.
     */
    container?: HTMLElement | Window | string;
}

const isInBrowser = isBrowser();

let config: ScrollToTopOfConfiguration = {
    duration: 300,
    offset: 0,
    container: isInBrowser ? window : null
};

/**
 * Helper to initialize the options without polluting the original options object
 * @param options
 */
function initializeOptions(options?: ScrollToTopOfConfiguration): ScrollToTopOfConfiguration
{
    const result: any = {...options};
    if (!isNumber(result.duration)) {
        result.duration = config.duration;
    }
    if (!isNumber(result.offset)) {
        const defaultOffset = isFunction(config.offset) ? (config.offset as any)(0) : config.offset;
        result.offset = isFunction(result.offset) ? (result.offset as any)(defaultOffset) : defaultOffset;
    }
    if (!isObject(result.container) && !isString(result.container)) {
        result.container = config.container;
    }
    if (isEmpty(result.container)) {
        result.container = window;
    }
    if (!isBool(result.breakOnManualScroll)) {
        result.breakOnManualScroll = true;
    }
    return result;
}

/**
 * Helper to define the default configuration for the scroll methods
 * @param {{}} configuration
 *            Should receive an object with the following options:
 *            - duration: (Default 300) The speed in milliseconds the scroll operation should take
 *            - offset: (Default 0) The offset to the top of the page when scrolling up
 *            - container: (Default null) The container to scroll instead of the window
 */
export function configureScrollToTopOf(configuration: ScrollToTopOfConfiguration)
{
    config = merge(config, configuration) as ScrollToTopOfConfiguration;
}

/**
 * Scrolls either the whole page or a specific element with the data attribute "data-scroll-target"
 * to the top of the element which is given as $o.
 *
 * @param target The object to which we should scroll
 * @param options Additional options for this scroll operation
 *            - duration: (Default 300) The duration in milliseconds the scroll operation should take
 *            - offset: (Default 0) The offset to the top of the page when scrolling up
 *            - container: (Default null) The container to scroll instead of the window
 */
export function scrollToTopOf(target?: HTMLElement | null, options?: ScrollToTopOfConfiguration)
{
    // Noop if not in browser
    if (!isBrowser()) {
        return;
    }
    
    const opt = initializeOptions(options);
    
    if (!target) {
        // Simply scroll to the top
        return scrollToPosition(0, opt.duration, opt.container);
    } else {
        // Scroll to a container position
        const containerIsWindow = opt.container === window;
        const offset = getOffset(target, !containerIsWindow ? opt.container as HTMLElement : undefined);
        return scrollToPosition(
            offset.top - (opt.offset as number),
            opt.duration,
            opt.container,
            opt.breakOnManualScroll
        );
    }
}