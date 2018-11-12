/**
 * Global objects for general use
 */
declare class $globj {
    static readonly document: JQuery<HTMLElement>;
    static readonly window: JQuery<HTMLElement>;
    static readonly html: JQuery<HTMLElement>;
    static readonly body: JQuery<HTMLElement>;
    static readonly htmlBody: JQuery<HTMLElement>;
}
export default $globj;
