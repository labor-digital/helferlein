/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.01.24 at 10:51
 */
import {getData} from "../Dom/getData";
import {List} from "../Interfaces/List";
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {getPageStorage} from "../Misc/getPageStorage";
import {isUndefined} from "../Types/isUndefined";
import {getScrollPos} from "./getScrollPos";

const storage = getPageStorage();
const isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
const html = document.querySelector("html") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;
const storageKeyStopped = "stopBodyScrolling";
const storageKeyBackup = "stopBodyScrollingPropertyBackup";

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
 * @param {boolean} state True to stop the scrolling, false to re-enable it.
 */
export function stopBodyScrolling(state?: boolean) {
	// Stop the scrolling
	if (isUndefined(state) || state === true) {
		// Ignore if already stopped
		if (storage.get(storageKeyStopped, false)) return;
		storage.set(storageKeyStopped, true);
		
		// Calculate the body width before we hide the scrollbar
		const oldBodyWidth = getBodyWidth();
		
		// Backup elements
		const createElementStyleBackup = function (el: HTMLElement) {
			const style = el.style;
			return {
				overflowX: style.overflowX,
				overflowY: style.overflowY,
				overflow: style.overflow,
				position: style.position,
				height: style.height,
				transition: style.transition,
				paddingRight: style.paddingRight
			};
		};
		storage.set(storageKeyBackup, {
			html: createElementStyleBackup(html),
			body: createElementStyleBackup(body),
			scrollPos: getScrollPos()
		});
		
		// Disable scrolling
		const disableElementScroll = function (el: HTMLElement, isHtml: boolean) {
			el.style.overflow = "hidden";
			el.style.transition = "none";
			el.style.overflowY = "hidden";
			el.style.overflowX = "auto";
			if (!isHtml || isIos) {
				el.style.overflow = "hidden";
				el.style.height = "hidden";
			}
		};
		disableElementScroll(html, true);
		disableElementScroll(body, false);
		
		// Calculate difference
		const bodyWidthDiff = getBodyWidth() - oldBodyWidth;
		body.style.paddingRight = bodyWidthDiff + "px";
		
		// Prevent jumping of fixed elements
		forEach(document.querySelectorAll("*[data-stop-body-scrolling-fixed]") as List, (element: HTMLElement) => {
			let offsetWidth = bodyWidthDiff;
			const config = getData(element, "stop-body-scrolling-fixed", "");
			if (config === "half") offsetWidth = offsetWidth / 2;
			element.style.transform = "translateX(-" + offsetWidth + "px)";
		});
	} else {
		// Ignore if already active
		if (!storage.get(storageKeyStopped, false)) return;
		storage.set(storageKeyStopped, false);
		
		// Restore backup
		const backup = storage.get(storageKeyBackup, {html: {}, body: {}, scrollPos: 0});
		storage.remove(storageKeyBackup);
		const restoreBackup = function (el: HTMLElement, backup: PlainObject) {
			forEach(backup, (v, k) => {
				el.style[k] = v;
			});
		};
		restoreBackup(html, backup.html);
		restoreBackup(body, backup.body);
		if (isIos) window.scrollTo(0, backup.scrollPos);
		
		// Reset fixed elements
		forEach(document.querySelectorAll("*[data-stop-body-scrolling-fixed]") as List, (element: HTMLElement) => {
			element.style.transform = "";
		});
	}
}