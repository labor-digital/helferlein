/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import {getPageStorage} from "../Misc/getPageStorage";
import {forEach} from "../Lists/forEach";
import {List} from "../Interfaces/List";
import {isUndefined} from "../Types/isUndefined";
import {getData} from "../Dom/getData";

const storage = getPageStorage("stopBodyScrolling");
const isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

/**
 * Reads the current body width in pixels
 */
function getBodyWidth(): number {
	return Math.max(
		document.documentElement.clientWidth,
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth
	);
}

/**
 * Helper to prevent the body from being scrolled with a fix for the ios 9 safari which is a pain...
 * @param {boolean} state True to stop the scrolling, false to reenable it.
 */
export function stopBodyScrolling(state?: boolean) {
	// Stop the scrolling
	if (isUndefined(state) || state === true) {
		// Ignore if already stopped
		if (storage.get("scrollingStopped", false)) return;

		// Mark as stopped
		storage.set("scrollingStopped", true);

		// Calculate the body width before we hide the scrollbar
		const oldBodyWidth = getBodyWidth();

		// Disable scrolling
		if (isIos) {
			// Store old position
			storage.set("scrollPos", window.scrollY || window.pageYOffset || document.documentElement.scrollTop);

			// Stop body scrolling with extra ios fix...
			forEach(document.querySelectorAll("html, body") as List, (e: HTMLElement) => {
				e.style.overflow = "hidden";
				e.style.position = "relative";
				e.style.height = "100%";
				e.style.transition = "none";
			});
		} else {
			document.body.style.overflow = "hidden";
			document.body.style.transition = "none";
		}

		// Calculate difference
		const bodyWidthDiff = getBodyWidth() - oldBodyWidth;
		document.body.style.paddingRight = bodyWidthDiff + "px";

		// Prevent jumping of fixed elements
		forEach(document.querySelectorAll("*[data-stop-body-scrolling-fixed]") as List, (element: HTMLElement) => {
			let offsetWidth = bodyWidthDiff;
			const config = getData(element, "stop-body-scrolling-fixed", "");
			if(config === "half") offsetWidth = offsetWidth / 2;
			element.style.transform = "translateX(-" + offsetWidth + "px)";
		});
	} else {
		// Ignore if already active
		if (!storage.get("scrollingStopped", false)) return;

		// Reenable body scrolling
		if (isIos) {
			window.scrollTo(0, storage.get("scrollPos", 0));
			forEach(document.querySelectorAll("html, body") as List, (e: HTMLElement) => {
				e.style.overflow = "";
				e.style.paddingRight = "";
				e.style.transition = "";
				e.style.position = "";
				e.style.height = "";
			});
		} else {
			forEach(document.querySelectorAll("body") as List, (e: HTMLElement) => {
				e.style.overflow = "";
				e.style.paddingRight = "";
				e.style.transition = "";
			});
		}

		// Reset fixed elements
		forEach(document.querySelectorAll("*[data-stop-body-scrolling-fixed]") as List, (element: HTMLElement) => {
			element.style.transform = "";
		});

		// Mark as active
		storage.set("scrollingStopped", false);
	}
}