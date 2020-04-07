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
 * Last modified: 2019.02.18 at 12:26
 */

import {inflectToDashed} from "./inflectToDashed";

const canUseUnicode: boolean = typeof (new RegExp("")).unicode === "boolean";

export const TransliterationReplacements: Array<Array<string | RegExp>> = [
	[/[ÆǼ]/g, "AE"],
	[/[Ä]/g, "Ae"],
	[/[ÇĆĈĊČ]/g, "C"],
	[/[ÐĎĐ]/g, "D"],
	[/[ÈÉÊËĒĔĖĘĚ]/g, "E"],
	[/[ĜĞĠĢҐ]/g, "G"],
	[/[ĤĦ]/g, "H"],
	[/[ÌÍÎÏĨĪĬǏĮİІ]/g, "I"],
	[/[Ĳ]/g, "IJ"],
	[/[Ĵ]/g, "J"],
	[/[Ķ]/g, "K"],
	[/[ĹĻĽĿŁ]/g, "L"],
	[/[ÑŃŅŇ]/g, "N"],
	[/[ÒÓÔÕŌŎǑŐƠØǾ]/g, "O"],
	[/[Œ]/g, "OE"],
	[/[Ö]/g, "Oe"],
	[/[ŔŖŘ]/g, "R"],
	[/[ŚŜŞȘŠ]/g, "S"],
	[/[ẞ]/g, "SS"],
	[/[ŢȚŤŦ]/g, "T"],
	[/[Þ]/g, "TH"],
	[/[ÙÚÛŨŪŬŮŰŲƯǓǕǗǙǛ]/g, "U"],
	[/[Ü]/g, "Ue"],
	[/[Ŵ]/g, "W"],
	[/[ÝŸŶ]/g, "Y"],
	[/[Є]/g, "Ye"],
	[/[Ї]/g, "Yi"],
	[/[ŹŻŽ]/g, "Z"],
	[/[àáâãåǻāăąǎª]/g, "a"],
	[/[äæǽ]/g, "ae"],
	[/[çćĉċč]/g, "c"],
	[/[ðďđ]/g, "d"],
	[/[èéêëēĕėęě]/g, "e"],
	[/[ƒ]/g, "f"],
	[/[ĝğġģґ]/g, "g"],
	[/[ĥħ]/g, "h"],
	[/[ìíîïĩīĭǐįıі]/g, "i"],
	[/[ĳ]/g, "ij"],
	[/[ĵ]/g, "j"],
	[/[ķ]/g, "k"],
	[/[ĺļľŀł]/g, "l"],
	[/[ñńņňŉ]/g, "n"],
	[/[òóôõōŏǒőơøǿº]/g, "o"],
	[/[öœ]/g, "oe"],
	[/[ŕŗř]/g, "r"],
	[/[śŝşșšſ]/g, "s"],
	[/[ß]/g, "ss"],
	[/[ţțťŧ]/g, "t"],
	[/[þ]/g, "th"],
	[/[ùúûũūŭůűųưǔǖǘǚǜ]/g, "u"],
	[/[ü]/g, "ue"],
	[/[ŵ]/g, "w"],
	[/[ýÿŷ]/g, "y"],
	[/[є]/g, "ye"],
	[/[ї]/g, "yi"],
	[/[źżž]/g, "z"],
	...(canUseUnicode ?
		[
			[new RegExp("[^\\s\\p{Zs}\\p{Ll}\\p{Lm}\\p{Lo}\\p{Lt}\\p{Lu}\\p{Nd}]", "gmu"), " "],
			[new RegExp("[\\s\\p{Zs}]", "gmu"), "-"]
		]
		:
		[
			[new RegExp("[^a-zA-Z0-9 -]", "gm"), " "],
			[new RegExp("\\s+", "gm"), "-"],
			[new RegExp("-+", "gm"), "-"],
			[new RegExp("^-+", "gm"), ""],
			[new RegExp("-+$", "gm"), ""]
		]),
	[/^[\\-]+|[\\-]+$/g, ""]
];

/**
 * Is used to convert all transliterations / umlauts in a string into simple representations.
 * ä => ae, ö => oe...
 * @param string
 */
export function unifyTransliterations(string: string): string {
	for (var i = 0; i < TransliterationReplacements.length; i++) {
		var a = TransliterationReplacements[i][0] as RegExp;
		var b = TransliterationReplacements[i][1] as string;
		string = string.replace(a, b);
	}
	return string;
}

/**
 * Converts a "Given string" to "Given-string" or
 * "another.String-you wouldWant" to "another-string-you-would-want".
 * But in addition to that, it will convert "Annahäuser_Römertopf.jpg" into "annahaeuser-roemertopf-jpg"
 *
 * @param string
 */
export function inflectToSlug(string: string): string {
	string = unifyTransliterations(string).trim();
	return inflectToDashed(string);
}