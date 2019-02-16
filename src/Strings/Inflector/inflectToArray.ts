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
 * Last modified: 2019.02.15 at 19:59
 */
import {isUndefined} from "../../Types/isUndefined";

export interface InflectToArrayOptionsType {
	/**
	 * Splits "myKeyValue" into ["my", "key", "value"]
	 * Default: true
	 */
	splitAtUpperCase?: boolean

	/**
	 * Splits "my-key-value" into ["my", "key", "value"]
	 * Default: true
	 */
	splitAtDash?: boolean

	/**
	 * Splits "my_key_value" into ["my", "key", "value"]
	 * Default: true
	 */
	splitAtUnderscore?: boolean

	/**
	 * Splits "my.key.value" into ["my", "key", "value"]
	 * Default: true
	 */
	splitAtPeriod?: boolean

	/**
	 * Splits "my key value" into ["my", "key", "value"]
	 * Default: true
	 */
	splitAtSpace?: boolean

	/**
	 * The default splitter for "splitAtUpperCase" is rather dumb;
	 * if you give it words like IP, URL, and so on, because it will split them
	 * like I, P and U, R, L (because of their upper chars) but stuff like HandMeAMango
	 * on the other hand will be correctly splitted like: hand, me, a, mango.
	 *
	 * If this is set to true splitting of following uppercase chars will be ignored
	 */
	splitAtUpperCaseSensible?: boolean
}

export function inflectToArray(string: string, options?: InflectToArrayOptionsType): Array<string> {
	let pattern = /(?=[A-Z])|[\-]+|[_]+|[.]+|[\s]+/;
	if (!isUndefined(options)){
		let patternString = "";
		if(options.splitAtUpperCase !== false){
			if (string === string.toUpperCase()){
				// Don't split if the whole string is in upper case
			} else if(options.splitAtUpperCaseSensible){
				// Precompile
				// This replaces everything thats in upper case with itself but with a space in front.
				// If there is more than a single char, like in ThisIsAGreatWord it will strip the
				// G (in Great) off and push it into the next word. The result will be: this is a great word.
				// Words like FAQ will be kept together if given alone.
				// Problems might occure when stuff like "ThisIsFAQandMore" is given,
				// because the camelCase is broken the result will be: this is fa qand more.
				string = string.replace(/[A-Z]+/g, (a, b, c, d) => {
					let nextWord = "";
					if(a.length > 1){
						nextWord = " " + a.substr(a.length - 1, 1);
						a = a.substr(0, a.length - 1);
					}
					return " " + (a + nextWord).toLowerCase();

				});
				console.log(string);
			} else {
				patternString += "(?=[A-Z])|";
			}
		}
		if (options.splitAtDash !== false) patternString += "[\-]+|";
		if (options.splitAtUnderscore !== false) patternString += "[_]+|";
		if (options.splitAtPeriod !== false) patternString += "[.]+|";
		if (options.splitAtSpace !== false) patternString += "[\\s]+|";
		patternString = patternString.replace(/\|$/, "");
		pattern = new RegExp(patternString, "g");
	}

	console.log(pattern);
	let parts = string.split(pattern).filter(v => v !== "");
	return parts.map(v => v.toLowerCase());
}