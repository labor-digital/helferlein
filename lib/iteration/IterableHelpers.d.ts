/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
export default class IterableHelpers {
    static getElementType(element: any): 'array' | 'set' | 'map' | 'object' | null;
    static getNewElement(type: 'array' | 'set' | 'map' | 'object'): {};
    static genericGet(elementType: 'array' | 'set' | 'map' | 'object', element: any, key: any): any;
    static genericSet(elementType: 'array' | 'set' | 'map' | 'object', element: any, key: any, value: any, dedupeArray?: boolean): any;
}
