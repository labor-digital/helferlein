/// <reference types="jquery" />
interface ScrollToTopOfConfiguration {
    /**
     * The speed in milliseconds the scroll operation should take
     */
    speed?: number;
    /**
     * The offset to the top of the page when scrolling up
     */
    offset?: number;
}
/**
 * Helper to define the default configuration for the scroll methdos
 * @param {{}} configuration
 *            Should receive an object with the following options:
 *            - speed: (Default 700) The speed in milliseconds the scroll operation should take
 *            - offset: (Default 0) The offset to the top of the page when scrolling up
 */
export declare function configureScrollToTopOf(configuration: ScrollToTopOfConfiguration): void;
/**
 * Scrolls either the whole page or a specific element with the data attribute "data-scroll-target"
 * to the top of the element which is given as $o.
 *
 * @param $target The object to scroll to the top of
 * @param $current If given will be used as childmarker. The method will bubble up and see if there
 *                is a possible 'data-scroll-target' to scroll instead of the main window
 * @param options Additional options for this scroll operation
 *                    - speed: (Default 700) The speed in milliseconds the scroll operation should take
 *                    - offset: (Default 0) The offset to the top of the page when scrolling up
 */
export declare function scrollToTopOf($target?: JQuery, $current?: JQuery | null, options?: ScrollToTopOfConfiguration): void;
export {};
