/// <reference types="jquery" />
/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import EventHandler = JQuery.EventHandler;
import EventHandlerBase = JQuery.EventHandlerBase;
import { JQueryEvent } from "./Interfaces";
export interface ThrottleEventWrapper extends EventHandler<HTMLElement, null> {
    /**
     * If you need to cancel a scheduled throttle, you can call .cancel() on the throttled function.
     */
    cancel?: Function;
}
export interface ThrottleEventWrapper extends Function {
    /**
     * If you need to cancel a scheduled throttle, you can call .cancel() on the throttled function.
     */
    cancel?: Function;
}
export interface ThrottledEventHandler extends EventHandler<HTMLElement, null>, EventHandlerBase<ThrottleEventWrapper, JQueryEvent> {
}
/**
 * Helper to throttle js events
 * The source code is mostly stolen from:
 * @see https://github.com/jashkenas/underscore/blob/master/underscore.js
 * Underscore.js 1.9.1
 * http://underscorejs.org
 * (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
export declare function throttleEvent(callback: ThrottledEventHandler, limit: number): ThrottleEventWrapper;
