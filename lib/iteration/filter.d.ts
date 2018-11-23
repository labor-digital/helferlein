/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import { ForEachCallbackType } from "./forEach";
export interface FilterCallback extends ForEachCallbackType {
}
export declare function filter(object: any, callback: FilterCallback): any;
