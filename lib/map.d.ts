interface MapCallbackType {
    /**
     * Called on every property of the iterade object
     * @param value
     * @param key
     * @param iteratedObject
     */
    (value?: any, key?: string | number, iteratedObject?: any): any;
}
/**
 * Works like Array.map() but also for objects
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key)
 * @return {*}
 */
export declare function map(object: Array<any> | {
    [key: string]: any;
} | any, callback: MapCallbackType): {};
export {};
