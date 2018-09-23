/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
interface ThrottleEventWrapper extends Function {
    /**
     * If you need to cancel a scheduled throttle, you can call .cancel() on the throttled function.
     */
    cancel?: Function;
}
/**
 * Helper to throttle js events
 * The source code is mostly stolen from:
 * @see https://github.com/jashkenas/underscore/blob/master/underscore.js
 * Underscore.js 1.9.1
 * http://underscorejs.org
 * (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
export declare function throttleEvent(callback: any, limit: any): ThrottleEventWrapper;
export {};
