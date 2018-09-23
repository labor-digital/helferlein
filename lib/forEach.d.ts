/// <reference types="jquery" />
interface forEachCallbackType extends Function {
    /**
     * Is called for every element of the iterated object
     * @param value The current value
     * @param key The current key
     * @param iteratedObject The iterated object
     */
    (value?: any, key?: string | number, iteratedObject?: any): void | boolean;
}
interface forEachCallbackType extends Function {
    /**
     * Is called for every element of the iterated object
     * @param $value The current value as a jquery object
     * @param value The current value
     * @param key The current key
     * @param iteratedObject The iterated object
     */
    ($value?: JQuery, key?: any, value?: any, iteratedObject?: any): void | boolean;
}
/**
 * Loops over arrays or objects and applies a given callback
 *
 * Will work with Arrays, Objects, Map, Set and jQuery objects.
 * If jQuery is used the callback params are: ($jQueryValue, key, value, iteratedObject)
 *
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key, iteratedObject)
 */
export declare function forEach(object: Array<any> | {
    [key: string]: any;
} | any, callback: forEachCallbackType): void;
export {};
