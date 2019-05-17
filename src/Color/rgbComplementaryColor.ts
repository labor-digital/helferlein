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
 * Last modified: 2019.05.17 at 17:04
 */

import {isObject} from "../Types/isObject";
import {RgbColor} from "./Color.interfaces";

export function rgbComplementaryColor(r: RgbColor): RgbColor;
export function rgbComplementaryColor(r: number, g: number, b: number): RgbColor;

/**
 * Calculates the opposite/complementary color for the given color and returns it
 * @param r
 * @param g
 * @param b
 */
export function rgbComplementaryColor(r: number | RgbColor, g?: number, b?: number): RgbColor {
	if (isObject(r)) ({r, g, b} = (r as RgbColor));
	return {
		r: Math.abs((r as number) - 255),
		g: Math.abs(g - 255),
		b: Math.abs(b - 255)
	};
}