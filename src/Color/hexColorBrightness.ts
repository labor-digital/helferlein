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

import {hexToRgbColor} from './hexToRgbColor';
import {rgbColorBrightness} from './rgbColorBrightnesss';

/**
 * Returns a value from (dark) 0 - 255 (bright) representing the given color's brightness on the screen.
 *
 * @param hexRaw
 */
export function hexColorBrightness(hexRaw: string): number
{
    return rgbColorBrightness(hexToRgbColor(hexRaw));
}