/*
 * Copyright 2020 LABOR.digital
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
 * Last modified: 2020.09.16 at 10:17
 */


/**
 * Checks if the given color is a valid color.
 * Hex, RGB, RGBA or a color string ('red') is valid.
 *
 * @param color
 */
export function isValidColor(color: string): boolean
{
    let s = new Option().style;
    s.color = color;
    return !!(typeof color === 'string' && s.color !== '');
}
