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

/**
 *
 * @param string The string to be split into an array
 * @param intelligentSplitting The default splitter is rather dumb when it comes to edge cases like  IP, URL, and so on,
 *                            because it will split them like I, P and U, R, L but stuff like HandMeAMango
 *                            on the other hand will be correctly splitted like: hand, me, a, mango.
 *                            If you set this to true, those edge cases will be handled.
 *                            Problems might occure when stuff like "ThisIsFAQandMore" is given,
 *                            because the camelCase is broken the result will be: this is fa qand more.
 */
export function inflectToArray(string: string, intelligentSplitting?: boolean): Array<string> {
	let pattern = /(?=[A-Z])|[\-]+|[_]+|[.]+|[\s]+/;

	// Handle intelligent splitting
	if (intelligentSplitting) {
		// Precompile
		// This replaces everything thats in upper case with itself but with a space in front.
		// If there is more than a single char, like in ThisIsAGreatWord it will strip the
		// G (in Great) off and push it into the next word. The result will be: this is a great word.
		// Words like FAQ will be kept together if given alone.
		// Problems might occure when stuff like "ThisIsFAQandMore" is given,
		// because the camelCase is broken the result will be: this is fa qand more.
		string = string.replace(/[A-Z]+/g, (a, b) => {
			let nextWord = "";
			if (a.length > 1 && b + a.length !== string.length) {
				nextWord = " " + a.substr(a.length - 1, 1);
				a = a.substr(0, a.length - 1);
			}
			return " " + (a + nextWord).toLowerCase();
		});
	} else if (string === string.toUpperCase())
		string = string.toLowerCase();

	// Handle numeric splitting
	if (string.match(/[0-9]/))
		string = string.replace(/([0-9]+)/g, " $1 ");

	let parts = string.split(pattern).filter(v => v !== "");
	return parts.map(v => v.toLowerCase());
}