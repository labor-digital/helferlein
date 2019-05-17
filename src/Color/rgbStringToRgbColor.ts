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
 * Last modified: 2019.05.17 at 16:53
 */

import {RgbColor} from "./Color.interfaces";

/**
 * Converts an rgb string like rgb(0, 233, 25) or rgba(0, 200, 33, 0.2) into it's hex representation.
 * @param rgbRaw
 */
export function rgbStringToRgbColor(rgbRaw: string): RgbColor {
	const rgb = rgbRaw.match(/^rgba?\((\d+|0),\s*(\d+|0),\s*(\d+|0)(?:,\s*\d+)?\)$/);
	return {
		r: parseInt(rgb[1]),
		g: parseInt(rgb[2]),
		b: parseInt(rgb[3])
	};
}