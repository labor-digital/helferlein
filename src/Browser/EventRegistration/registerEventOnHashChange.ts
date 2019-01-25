/**
 * Created by Martin Neundorfer on 17.01.2019.
 * For LABOR.digital
 */
import {EventBus} from "../EventBus";

let isRegistered = false;
let currentHash = window.location.hash;

/**
 * Registers the hash__change event on the event bus
 * which is triggered every time the user moves in the
 * history forwards or backwards.
 *
 * If you change the hash and don't want hash.change to be triggered by it,
 * emit the "hash__update" event first and set args: {new: "#/new/hash"}
 */
export function registerEventOnHashChange():void {
	if(isRegistered) return;
	isRegistered = true;

	// Register popstate event to detect history navigation
	window.addEventListener("popstate", (e) => {
		if(e.isTrusted !== true) return;
		if(currentHash === window.location.hash) return;
		EventBus.emit("hash__change", {
			old: currentHash,
			new: window.location.hash
		});
		currentHash = window.location.hash;
	});

	// Register cross link to UrlHash Api to prevent unwanted popstates we did ourself
	EventBus.bind("hash__update", (e) => {
		currentHash = e.args.new;
	});
}