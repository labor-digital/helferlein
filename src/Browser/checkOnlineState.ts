/**
 * Created by Martin Neundorfer on 30.08.2018.
 * For LABOR.digital
 */

import {ajax} from "./ajax";

/**
 * True if the browser can reach the internet, false if not
 */
let onlineState:boolean = false;

/**
 * The timestamp of the last time this script ran
 */
let lastCheck:number = 0;

/**
 * Checks if the client is currently online or not
 */
export function checkOnlineState(): Promise<boolean> {
	return new Promise(resolve => {
		if (lastCheck > (Date.now() - (60 * 10 * 1000))) {
			resolve(onlineState);
			return;
		}
		ajax({
			url: "http://laboranten.net/_extern/labor-javascript-online-check/",
			timeout: 300
		}).then(() => {
			lastCheck = Date.now();
			onlineState = true;
		}).catch(() => {
			lastCheck = 0;
			onlineState = false;
			resolve(false);
		});
	});
}