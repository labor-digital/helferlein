/// <reference types="jquery" />
/**
 * Global objects for general use
 */
declare class $globj {
    static readonly document: JQuery;
    static readonly window: JQuery;
    static readonly html: JQuery;
    static readonly body: JQuery;
    static readonly htmlBody: JQuery;
}
export default $globj;
