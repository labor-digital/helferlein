/**
 * Created by Martin Neundorfer on 05.09.2018.
 * For LABOR.digital
 */
declare global {
    interface HTMLElement {
        createTextRange?: Function;
    }
}
/**
 * Helper to select all text of a given element
 * (Like marking it with the mouse)
 *
 * The implementation is from https://stackoverflow.com/a/987376
 * But the author quotes https://www.codingforums.com/archive/index.php/t-105808.html
 *
 * @param {jQuery} $o The jquery object to mark the text of
 */
export declare function selectTextOfElement($o: any): void;
