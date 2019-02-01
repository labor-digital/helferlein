/**
 * Created by Martin Neundorfer on 22.01.2019.
 * For LABOR.digital
 */
import {isPlainObject} from "../Types/isPlainObject";
import {isNumber} from "../Types/isNumber";
import {isString} from "../Types/isString";

interface LoadJsOptions {
	/**
	 * The timeout in milliseconds after which the promise should fail
	 */
	timeout?: number,

	/**
	 * The type of asset to load
	 */
	type?: "js" | "css"
}

const loadedJs: Map<string, Promise<string>> = new Map();

/**
 * This helper may be used to load additional javascript or css files
 * to the current page. It will return a promise which resolves to the loaded url.
 *
 * NOTE: Should be called after the document is ready!
 *
 * @param url
 * @param options
 */
export function loadAsset(url: string, options?: LoadJsOptions): Promise<string> {
	if (loadedJs.has(url)) return loadedJs.get(url);
	if (!isPlainObject(options)) options = {};
	const promise = new Promise<string>((resolve, reject) => {
		const timeoutTime = isNumber(options.timeout) ? options.timeout : 2000;
		const timeout = setTimeout(() => reject("Timeout after " + timeoutTime + "ms."), timeoutTime);

		(new Promise(resolve1 => {
			const elType = isString(options.type) && options.type === "css" ? "css" : "js";
			let el;
			if (elType === "css") {
				el = document.createElement("link");
				el.rel = "stylesheet";
				el.href = url;
			} else {
				el = document.createElement("script");
				el.type = "text/javascript";
				el.src = url;
			}
			document.head.appendChild(el);
			el.onload = () => {
				resolve1();
			};
			el.onerror = (e) => {
				reject("An error occured while loading: \"" + url + "\"");
			};

		}).then(() => {
			clearTimeout(timeout);
			resolve(url);
		}));

	});
	loadedJs.set(url, promise);
	return promise;
}