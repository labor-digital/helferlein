/**
 * Created by Martin Neundorfer on 17.01.2019.
 * For LABOR.digital
 */
import {PlainObject} from "../Interfaces/PlainObject";
import {forEach} from "../Lists/forEach";
import {isUndefined} from "../Types/isUndefined";
import {isString} from "../Types/isString";
import {map} from "../Lists/map";
import {asArray} from "../FormatAndConvert/asArray";
import {isEmpty} from "../Types/isEmpty";
import {EventBus} from "./EventBus";

let knownHash = "";
let hashCache = {};

/**
 * This helper is used to set an anchor part of the url
 * to a list of key value pairs like: #/key/value/key2/value2
 */
export class UrlHash {
	/**
	 * Checks if a given key is set in the current anchor tag
	 * @param key
	 */
	static has(key: string): boolean {
		const hash = UrlHash.getAll();
		return !isUndefined(hash[key]);
	}

	/**
	 * Returns the value for a given key
	 * @param key The key to retrieve the value for
	 * @param defaultValue Optional value which is returned if the given key does not exist
	 */
	static get(key: string, defaultValue?: string | null): string | null | undefined {
		const hash = UrlHash.getAll();
		return isUndefined(hash[key]) ? defaultValue : hash[key];
	}

	/**
	 * Sets a single key value pair
	 * @param key
	 * @param value
	 */
	static set(key: string, value: string | number | null): void {
		const hash = UrlHash.getAll();
		if (isEmpty(value)) delete hash[key];
		else hash[key] = value;
		UrlHash.update(hash);
	}

	/**
	 * Sets multiple values using only a single change request
	 * @param values
	 */
	static setMultiple(values: PlainObject): void {
		const hash = UrlHash.getAll();
		forEach(values, (v, k) => {
			if (isEmpty(v)) {
				delete hash[k];
				return;
			}
			hash[k] = v;
		});
		UrlHash.update(hash);
	}

	/**
	 * Returns all key value pairs that are currently in the hash
	 */
	static getAll(): PlainObject {
		return JSON.parse(JSON.stringify(UrlHash.parseFromUrl()));
	}

	/**
	 * Parses the current hash value into an object
	 * The hash is expected to look like #/key/value/key2/value2
	 */
	protected static parseFromUrl(): PlainObject {
		if (window.location.hash === knownHash) return hashCache;
		if (window.location.hash === "") return {};
		if (window.location.hash.indexOf("/") === -1) return {};
		knownHash = window.location.hash;
		const hash = window.location.hash.replace(/^[#\/]*/, "");
		const hashParts = hash.split("/");
		const parsed = {};
		let key = null;
		forEach(hashParts, e => {
			e = decodeURIComponent(e);
			if (key !== null) {
				if (parseInt(e) + "" === e) e = parseInt(e);
				parsed[key] = e;
				key = null;
				return;
			}
			key = e;
		});
		return hashCache = parsed;
	}

	/**
	 * Converts the given hash object into a string representation valid for the url
	 * @param hash
	 */
	protected static update(hash: PlainObject): void {
		if (isEmpty(hash)) {
			EventBus.emit("hash__update", {new: ""});
			window.location.hash = "";
			return;
		}
		const list = asArray(map(hash, (v, k) => encodeURIComponent(k + "") + "/" + encodeURIComponent(v)));
		const hashString = "#/" + list.join("/");
		EventBus.emit("hash__update", {new: hashString});
		window.location.hash = hashString;
	}
}