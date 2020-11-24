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
 * Last modified: 2019.05.17 at 17:06
 */
import {hexToRgbColor, rgbComplementaryColor, rgbToHexColor} from '..';

/**
 * Calculates the opposite/complementary color for the given color and returns it
 * @param hexRaw
 */
export function hexComplementaryColor(hexRaw: string): string
{
    return rgbToHexColor(rgbComplementaryColor(hexToRgbColor(hexRaw)));
}