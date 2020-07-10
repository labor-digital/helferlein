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
 * Last modified: 2019.05.17 at 17:03
 */

import {hexToRgbColor} from './hexToRgbColor';
import {rgbContrastColor} from './rgbContrastColor';
import {rgbToHexColor} from './rgbToHexColor';

/**
 * Receives a color and calculates another color which is either lighter or darker as the given color
 * and should be readable when used as text color in front of the given color.
 * @param hexRaw
 */
export function hexContrastColor(hexRaw: string): string
{
    return rgbToHexColor(rgbContrastColor(hexToRgbColor(hexRaw)));
}