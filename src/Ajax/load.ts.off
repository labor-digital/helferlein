/**
 * Created by Martin Neundorfer on 16.11.2018.
 * For LABOR.digital
 */
import {LoadOptions} from "./load.interfaces";

// The list of all demaded elements that were required by us
const requests: Map<string, Promise<string>> = new Map();

// Loads a (javascript) file and adds it to the header using jquery's ajax
// Even if there are multiple requests there should be always only a single request
export function load(src:string, options?:LoadOptions):Promise<string> {

	// Prepare options
	if(typeof options === "undefined") options = {};
	if(typeof options.timeout !== "number") options.timeout = 5000;

	// Prepare src
	const srcUnified = src.trim().toLowerCase();

	// Check if this element was already requested
	if(requests.has(srcUnified)) return requests.get(srcUnified);

	// Create a new request
	const request:Promise<string> = new Promise<string>((resolve, reject) => {

		// Handler to check if we ran into a timeout
		let timeoutMarker: any = 0;

		// Marker to let the script timeout
		timeoutMarker = setTimeout(() => {
			reject("TIMEOUT: Could not load the required file: " + src)
		}, options.timeout);

		$.ajax({
			url: src,
			dataType: "script"
		})
			.done(() => {
				clearTimeout(timeoutMarker);
				resolve(src)
			})
			.fail(() => reject("ERROR: Could not load the required file: " + src))
	});
	requests.set(srcUnified, request);

	// Done
	return request;
}