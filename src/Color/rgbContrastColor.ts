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
 * Last modified: 2019.05.17 at 16:58
 */
import {isObject} from '../Types/isObject';
import type {RgbColor} from './Color.interfaces';
import {rgbColorBrightness} from './rgbColorBrightness';

export function rgbContrastColor(r: RgbColor): RgbColor;
export function rgbContrastColor(r: number, g: number, b: number): RgbColor;

/**
 * Receives a color and calculates another color which is either lighter or darker as the given color
 * and should be readable when used as text color in front of the given color.
 *
 * @param r
 * @param g
 * @param b
 */
export function rgbContrastColor(r: number | RgbColor, g?: number, b?: number): RgbColor
{
    if (isObject(r)) {
        ({r, g, b} = (r as RgbColor));
    }
    
    g = g ?? 0;
    b = b ?? 0;
    
    const brightness = rgbColorBrightness((r as number), g, b);
    const average = ((r as number) + g + b) / 3;
    const isGrayScale = brightness > average - 10 && brightness < average + 10;
    const modifier = brightness < 128 ? Math.abs(255 - brightness) : -brightness * 0.8;
    
    // Note: Those "random numbers" like 1.701 are basically the numbers used for the brightness calculation
    // e.g the r value is multiplied by 299, while green is multiplied by 587 to get a general brightness
    // here I did 1000 - 587 to get 413 which lead to 1.413 in the g calculation.
    r = Math.floor(Math.max(0, Math.min(255, (r as number) + (modifier * 0.7 * (isGrayScale ? 1 : 1.701)))));
    g = Math.floor(Math.max(0, Math.min(255, g + (modifier * 0.7 * (isGrayScale ? 1 : 1.413)))));
    b = Math.floor(Math.max(0, Math.min(255, b + (modifier * 0.7 * (isGrayScale ? 1 : 1.886)))));
    
    return {r, g, b};
}