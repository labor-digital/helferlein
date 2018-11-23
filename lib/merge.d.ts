import { GenericObject } from "./Interfaces";
/**
 * This is the lightwight brother of mergeRecursive.
 * It will only merge arrays and generic objects. It will also only merge
 * elements with the same type, meaning objects with objects and arrays with arrays.
 * If an error occured the method will return false
 *
 * @param args
 */
export declare function merge(...args: any[]): Array<any> | GenericObject | boolean;
