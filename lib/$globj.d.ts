/// <reference types="jquery" />
/// <reference types="bootstrap-datepicker" />
/// <reference types="isotope-layout" />
/// <reference types="select2" />
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
