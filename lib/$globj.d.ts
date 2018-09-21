/// <reference types="jquery" />
/**
 * Global objects for general use
 */
declare class $globj {
    static readonly document: JQuery;
    static readonly window: JQuery;
    static readonly html: any;
    static readonly body: any;
    static readonly htmlBody: any;
}
export default $globj;
