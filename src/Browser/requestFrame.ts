/**
 * Created by Martin Neundorfer on 31.01.2019.
 * For LABOR.digital
 */

/**
 * This part is mostly stolen and only slightly modified
 * to avoid global pollution
 * Original source: https://gist.github.com/paulirish/1579671#file-raf-js-L11
 */
var lastTime = 0;
const vendors = ["ms", "moz", "webkit", "o"];
let req = null;
let can = null;
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	req = window[vendors[x] + "RequestAnimationFrame"].bind(window);
	can = window[vendors[x] + "CancelAnimationFrame"].bind(window) || window[vendors[x] + "CancelRequestAnimationFrame"].bind(window);
}
if (req === null)
	req = function (callback, element) {
		const currTime = new Date().getTime();
		const timeToCall = Math.max(0, 16 - (currTime - lastTime));
		const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};
if (can === null) can = (id) => clearTimeout(id);

/**
 * Wrapper around a requestAnimationFrame polyfill to avoid global namespace pollution
 * @param callback
 */
export function requestFrame(callback: Function | any): number {
	return req(callback);
}

/**
 * Wrapper around cancelAnimationFrame to avoid global namespace pollution
 * @param id
 */
export function cancelFrame(id: number) {
	can(id);
}