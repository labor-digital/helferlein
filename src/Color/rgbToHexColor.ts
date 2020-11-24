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
 * Last modified: 2019.05.17 at 16:43
 */

import {isObject, RgbColor} from '..';

export function rgbToHexColor(r: RgbColor): string;
export function rgbToHexColor(r: number, g: number, b: number): string;

/**
 * Converts a given rgb value into a hex representation
 * @param r
 * @param g
 * @param b
 */
export function rgbToHexColor(r: number | RgbColor, g?: number, b?: number): string
{
    if (isObject(r)) {
        ({r, g, b} = (r as RgbColor));
    }
    return '#' + ((1 << 24) + ((r as number) << 16) + (g << 8) + b).toString(16).slice(1);
}