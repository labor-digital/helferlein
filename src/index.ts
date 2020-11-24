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
 * Last modified: 2020.11.24 at 00:23
 */

// BROWSER
export * from './Browser/ajax';
export * from './Browser/checkOnlineState';
export * from './Browser/loadAsset';
export * from './Browser/requestFrame';
export * from './Browser/UrlHash';

// COLOR
export * from './Color/Color.interfaces';
export * from './Color/getBackgroundColor';
export * from './Color/hexColorBrightness';
export * from './Color/hexComplementaryColor';
export * from './Color/hexContrastColor';
export * from './Color/hexToRgbColor';
export * from './Color/isValidColor';
export * from './Color/rgbColorBrightness';
export * from './Color/rgbComplementaryColor';
export * from './Color/rgbContrastColor';
export * from './Color/rgbStringToHexColor';
export * from './Color/rgbStringToRgbColor';
export * from './Color/rgbToHexColor';

// DOM
export * from './Dom/addClass';
export * from './Dom/closest';
export * from './Dom/getAttr';
export * from './Dom/getData';
export * from './Dom/getOffset';
export * from './Dom/getSize';
export * from './Dom/hasClass';
export * from './Dom/removeClass';
export * from './Dom/setAttr';
export * from './Dom/setFocus';
export * from './Dom/toggleClass';

// Entities
export * from './Entities/ComponentProxy';

// STRINGS
export * from './Strings/htmlEncode';

// -- Validate
export * from './Strings/Validate/validateEmail';
export * from './Strings/Validate/validatePattern';
export * from './Strings/Validate/validateUrl';

