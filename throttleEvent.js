/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
/**
 * Helper to throttle js events
 * The source code is mostly stolen from:
 * @see https://github.com/jashkenas/underscore/blob/master/underscore.js
 * Underscore.js 1.9.1
 * http://underscorejs.org
 * (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
export default function throttleEvent (callback, limit) {
	var timeout, context, args, result;
	let previous = 0;

	var later = function() {
		previous = new Date().getTime();
		timeout = null;
		result = callback.apply(context, args);
		if (!timeout) context = args = null;
	};

	var throttled = function() {
		var now = new Date().getTime();
		if (!previous) previous = now;
		var remaining = limit - (now - previous);
		context = this;
		if (remaining <= 0 || remaining > limit) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = callback.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};

	throttled.cancel = function() {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};

	return throttled;
}