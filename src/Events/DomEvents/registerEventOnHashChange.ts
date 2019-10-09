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
 * Last modified: 2019.01.24 at 15:25
 */
import {isBrowser} from "../../Environment/isBrowser";
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
export function registerEventOnHashChange(): void {
	if (!isBrowser() || isRegistered) return;
	isRegistered = true;
	
	// Register popstate event to detect history navigation
	window.addEventListener("popstate", (e) => {
		if (e.isTrusted !== true) return;
		if (currentHash === window.location.hash) return;
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