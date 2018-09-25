/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import $globj from "./$globj";
import {mergeRecursive} from "./mergeRecursive";
import {GenericObject} from "./Interfaces";

interface ScrollToTopOfConfiguration extends GenericObject
{
	/**
	 * The speed in milliseconds the scroll operation should take
	 */
	speed?: number,
	
	/**
	 * The offset to the top of the page when scrolling up
	 */
	offset?: number
}

let config: ScrollToTopOfConfiguration = {
	speed: 700,
	offset: 0
};

/**
 * Helper to define the default configuration for the scroll methdos
 * @param {{}} configuration
 *            Should receive an object with the following options:
 *            - speed: (Default 700) The speed in milliseconds the scroll operation should take
 *            - offset: (Default 0) The offset to the top of the page when scrolling up
 */
export function configureScrollToTopOf(configuration: ScrollToTopOfConfiguration)
{
	config = mergeRecursive(config, configuration) as GenericObject;
}

/**
 * Internal helper to execute the scrolling
 * @param $target
 * @param position
 * @param speed
 */
function doScroll($target: JQuery, position?: number | undefined, speed?: number)
{
	if (typeof position !== "number") position = 0;
	$target.animate({
		scrollTop: position
	}, speed, "swing", function () {
		$globj.document.trigger("scroll__toTopOf--done", [$target])
	});
}

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

export function scrollToTopOf($target?: JQuery, $current?: JQuery | null, options?: ScrollToTopOfConfiguration)
{
	
	// Check if we should scroll up to 0
	if (typeof $target === "undefined")
	{
		doScroll($globj.htmlBody);
		return;
	}
	
	// Check if an object was given
	if ($target.length === 0) return;
	
	// Prepare options
	if (typeof options !== "object") options = {};
	if (typeof options.speed !== "number") options.speed = config.speed;
	if (typeof options.offset !== "number") options.offset = config.offset;
	
	// Check if we have a scroll target
	if (typeof $current !== "undefined" && $current !== null)
	{
		var $scrollTarget = $current.closest("*[data-scroll-target]");
		if ($scrollTarget.length > 0)
		{
			doScroll($scrollTarget, $target.offset().top + $scrollTarget.scrollTop() -
				$scrollTarget.offset().top, options.speed);
			return;
		}
	}
	
	// Scroll up whole page to position
	doScroll($globj.htmlBody, Math.max(options.offset, $target.offset().top), options.speed);
}