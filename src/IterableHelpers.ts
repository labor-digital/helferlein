import {isSet} from "./isSet";
import {isMap} from "./isMap";
import {forEach} from "./forEach";

/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
export default class IterableHelpers {
	static getElementType(element: any): 'array' | 'set' | 'map' | 'object' | null {
		if (Array.isArray(element)) {
			return 'array';
		} else if (isSet(element)) {
			return 'set';
		} else if (isMap(element)) {
			return 'map';
		} else if (typeof element === 'object' && element !== null) {
			return 'object';
		}
		return null;
	}
	
	static getNewElement(type: 'array' | 'set' | 'map' | 'object') {
		switch (type) {
			case 'array':
				return [];
			case 'set':
				return new Set();
			case 'map':
				return new Map();
			case 'object':
				return {};
		}
	}
	
	static genericGet(elementType: 'array' | 'set' | 'map' | 'object', element, key) {
		switch (elementType) {
			case 'array':
				return element[key];
			case 'set':
				let out = undefined;
				forEach(element, (v, k) => {
					if (k !== key) return;
					out = v;
					return false;
				});
				return out;
			case 'map':
				return element.get(key);
			case 'object':
				return element[key + ''];
		}
	}
	
	static genericSet(elementType: 'array' | 'set' | 'map' | 'object', element, key, value, dedupeArray?:boolean) {
		switch (elementType) {
			case 'array':
				// Don't duplicate array entries
				if (dedupeArray !== false && element.indexOf(value) !== -1) return element;
				element.push(value);
				return element;
			case 'set':
				element.add(value);
				return element;
			case 'map':
				element.set(key, value);
				return element;
			case 'object':
				element[key] = value;
				return element;
		}
	}
}