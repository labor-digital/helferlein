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
 * Last modified: 2019.05.17 at 16:46
 */
import {isObject, RgbColor} from '..';

export function rgbColorBrightness(r: RgbColor): number;
export function rgbColorBrightness(r: number, g: number, b: number): number;

/**
 * Returns a value from (dark) 0 - 255 (bright) representing the given color's brightness on the screen.
 *
 * @param r
 * @param g
 * @param b
 * @deprecated use the function in the correctly named file instead! Whoops...
 */
export function rgbColorBrightness(r: number | RgbColor, g?: number, b?: number): number
{
    if (isObject(r)) {
        ({r, g, b} = (r as RgbColor));
    }
    return ((r as number) * 299 + g * 587 + b * 114) / 1000;
}