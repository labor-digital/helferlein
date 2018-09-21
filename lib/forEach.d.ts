/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
interface forEachCallbackType extends Function {
    /**
     * Is called for every element of the iterated object
     * @param value The current value
     * @param key The current key
     * @param iteratedObject The iterated object
     */
    (value?: any, key?: string | number, iteratedObject?: any): void | false;
}
interface forEachCallbackType extends Function {
    /**
     * Is called for every element of the iterated object
     * @param $value The current value as a jquery object
     * @param value The current value
     * @param key The current key
     * @param iteratedObject The iterated object
     */
    ($value?: any, key?: any, value?: any, iteratedObject?: any): void | false;
}
/**
 * Loops over arrays or objects and applies a given callback
 * Does also work with jquery objects
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 */
export declare function forEach(object: Array<any> | {
    [key: string]: any;
} | any, callback: forEachCallbackType): void;
export {};
