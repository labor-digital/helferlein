interface ReduceCallbackType {
    /**
     * Is called on every element of the iterated list
     * @param current The combined value of all predecessors
     * @param value The current value
     * @param key The key of the current value
     * @param list The iterated list
     */
    (current: any, value?: any, key?: string | number, list?: any): any;
}
/**
 * Helper to appliy a function against an accumulator and each element in the list to reduce it to a single value.
 *
 * Will work with Arrays, Objects, Map, Set
 *
 * @param value Either an array or an object to reduce
 * @param callback The reducer to use for the combination
 * @param initial The initial value
 */
export declare function reduce(value: Array<any> | {
    [key: string]: any;
} | any, callback: ReduceCallbackType, initial?: any): any;
export {};
