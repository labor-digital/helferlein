declare global {
    interface Window {
        /**
         * True if the body scrolling is currently blocked
         * False / Undefined if not
         */
        HELPERS_JS_STOP_BODY_SCROLLING: boolean;
        /**
         * Used on IOS devices to make sure we really block the scrolling.
         * In that case we have to set the scroll position to 0 and afterwards reset it back.
         * This value holds the stored position.
         */
        HELPERS_JS_STOP_BODY_SCROLLING_POSITION: number;
    }
}
/**
 * Helper to prevent the body from being scrolled with a fix for the ios 9 safary which is a pain...
 * @param {boolean} state True to stop the scrolling, false to reenable it.
 */
export declare function stopBodyScrolling(state: any): void;
