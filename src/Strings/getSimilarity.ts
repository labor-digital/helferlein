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
 * Last modified: 2019.06.13 at 21:10
 */

/**
 * Returns a fraction between 0 and 1, which indicates the degree of similarity between the two strings.
 * 0 indicates completely different strings, 1 indicates identical strings. The comparison is case-sensitive.
 *
 * @see https://github.com/aceakash/string-similarity/blob/master/compare-strings.js
 *
 * This is a carbon copy of the referenced library, which was converted to typescript and
 * had some parts changed to be easier to minify for the web
 *
 */
export function getSimilarity(a: string, b: string): number {
	/**
	 * MIT License
	 
	 Copyright (c) 2018 Akash Kurdekar
	 
	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:
	 
	 The above copyright notice and this permission notice shall be included in all
	 copies or substantial portions of the Software.
	 
	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 SOFTWARE.
	 
	 https://github.com/aceakash/string-similarity/blob/master/LICENSE
	 */
	a = a.replace(/\s+/g, "");
	b = b.replace(/\s+/g, "");
	const aLen = a.length;
	const bLen = b.length;
	
	if (!aLen && !bLen) return 1; 			// if both are empty strings
	if (!aLen || !bLen) return 0; 			// if only one is empty string
	if (a === b) return 1; 					// identical
	if (aLen === 1 && bLen === 1) return 0; // both are 1-letter strings
	if (aLen < 2 || bLen < 2) return 0;		// if either is a 1-letter string
	
	let aBigrams = new Map();
	for (let i = 0; i < aLen - 1; i++) {
		const bigram = a.substring(i, i + 2);
		const count = aBigrams.has(bigram)
			? aBigrams.get(bigram) + 1
			: 1;
		
		aBigrams.set(bigram, count);
	}
	
	let intersectionSize = 0;
	for (let i = 0; i < bLen - 1; i++) {
		const bigram = b.substring(i, i + 2);
		const count = aBigrams.has(bigram)
			? aBigrams.get(bigram)
			: 0;
		
		if (count > 0) {
			aBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}
	
	return (2.0 * intersectionSize) / (aLen + bLen - 2);
}