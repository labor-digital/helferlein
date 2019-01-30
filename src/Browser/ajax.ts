/**
 * Created by Martin Neundorfer on 30.01.2019.
 * For LABOR.digital
 */
import {PlainObject} from "../Interfaces/PlainObject";
import {isString} from "../Types/isString";
import {isPlainObject} from "../Types/isPlainObject";
import {isNumber} from "../Types/isNumber";
import {isUndefined} from "../Types/isUndefined";
import {forEach} from "../Lists/forEach";
import {isEmpty} from "../Types/isEmpty";

export interface AjaxRequest {
	/**
	 * The url to send the request to
	 */
	url: string

	/**
	 * By default "get", can be set to post data to a server
	 */
	type?: "post" | "get"

	/**
	 * A number in milliseconds after the script should time out
	 */
	timeout?: number

	/**
	 * The payload works for both get and post requests
	 */
	data?: PlainObject | FormData | any
}

export class AjaxResponse {
	/**
	 * The status code send by the server
	 */
	status: number;

	/**
	 * The payload send by the server.
	 * Contains either the string or an object/array if the server send a json object our way
	 */
	data: string | PlainObject | Array<any>;

	/**
	 * The payload always as a string
	 */
	dataRaw: string;

	/**
	 * The error message or undefined
	 */
	error?: string;

	/**
	 * The used xml http request
	 */
	raw: XMLHttpRequest;
}

/**
 * Internal helper which is used to prepare the data to either a
 * formadata object or to a query string for get requests.
 *
 * @param data
 * @param asGet
 */
function prepareData(data, asGet: boolean) {
	// Ignore empty data
	if (isEmpty(data)) return asGet ? "" : data;

	// Make sure we have a formdata object to work with
	if (!(data instanceof FormData)) {
		const formData = new FormData();
		// This part is stolen... The original source is here:
		// https://next.plnkr.co/edit/24fsVLGn6rLEPhRDM0R7?utm_source=legacy&utm_medium=worker&utm_campaign=next&preview
		const walker = function (formData: FormData, data, parentKey?: string) {
			if (data && typeof data === "object" && !(data instanceof Date) && !(data instanceof File)) {
				Object.keys(data).forEach(key => {
					walker(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
				});
			} else {
				const value = data == null ? "" : data;
				formData.append(parentKey, value);
			}
		};
		// Stolen part end...
		walker(formData, data);
		data = formData;
	}
	if (!asGet) return data;

	// Convert the data into a url string
	let query = [];
	forEach(data, (v, k) => {
		query.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
	});
	return "?" + query.join("&");
}

/**
 * This helper is a wrapper around BASIC ajax functionallity.
 * It supports post and get requests. It also supports data submission based
 * on an javascript object and should work with any backend without problems.
 *
 * It returns a promise which holds a response object you can get the returned data from.
 * If the result is a json format, it will be auto-decoded for you
 *
 * NOTE: This is the simplest implementation you can do and does not supply you with any comfort features
 * than the automatic encoding of data objects. If you want more advanced features you should use axios or
 * jQuery's ajax instead of this one.
 *
 * @param request
 */
export function ajax(request: AjaxRequest): Promise<AjaxResponse> {
	if (!isPlainObject(request)) throw new Error("Invalid request object given!");
	request.type = !isString(request.type) ? "get" : request.type.trim().toLowerCase() as any;
	if (!isNumber(request.timeout)) request.timeout = 0;
	const isGet = request.type === "get";
	return new Promise((resolve, reject) => {
		if (!isUndefined(request.data)) request.data = prepareData(request.data, isGet);

		// Create request and response
		// @ts-ignore
		const xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		const response = new AjaxResponse();
		response.raw = xhttp;

		// Prepaere data
		const url = isGet ? request.url + request.data : request.url;
		xhttp.open(request.type, url, true);
		if (request.timeout !== 0) xhttp.timeout = request.timeout;

		// Set result handler
		xhttp.onreadystatechange = function () {
			if (this.readyState !== 4) return;
			response.status = this.status;
			response.data = response.dataRaw = this.responseText;
			if (this.status == 200) {
				try {
					response.data = JSON.parse(this.responseText);
				} catch (e) {
				}
				return resolve(response);
			}
			response.error = "AJAX error: " + this.statusText;
			reject(response);
		};

		// Set timeout handler
		xhttp.ontimeout = function () {
			response.status = 408;
			response.error = "AJAX error: The timeout of " + request.timeout + "ms was reached";
			reject(response);
		};
		xhttp.send(isGet ? undefined : request.data);
	});
}