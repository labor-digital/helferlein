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

// ENTITIES
export * from './Entities/ComponentProxy';
export * from './Entities/GenericStorage';
export * from './Entities/GenericStorageInterface';

// ENVIRONMENT
export * from './Environment/isBrowser';
export * from './Environment/isNode';

// EVENTS
export * from './Events/EventBus';
export * from './Events/EventEmitter';
export * from './Events/HelferleinEventList';

// -- DomEvents
export * from './Events/DomEvents/emitDomEvent';
export * from './Events/DomEvents/onDomMutation';
export * from './Events/DomEvents/onDomReady';
export * from './Events/DomEvents/registerEventBreakpointChange';
export * from './Events/DomEvents/registerEventOnHashChange';
export * from './Events/DomEvents/registerEventResizeThrottled';
export * from './Events/DomEvents/registerEventScrollThrottled';

// FORMAT AND CONVERT
export * from './FormatAndConvert/asArray';
export * from './FormatAndConvert/asObject';
export * from './FormatAndConvert/formatDateAndTime';
export * from './FormatAndConvert/moneyAsNumber';
export * from './FormatAndConvert/numberAsFileSize';
export * from './FormatAndConvert/numberAsMoney';
export * from './FormatAndConvert/numberAsPercent';
export * from './FormatAndConvert/percentAsNumber';

// INTERFACES
export * from './Interfaces/List';
export * from './Interfaces/PlainObject';

// LISTS
export * from './Lists/chunks';
export * from './Lists/cloneList';
export * from './Lists/filter';
export * from './Lists/forEach';
export * from './Lists/listAccess';
export * from './Lists/map';
export * from './Lists/merge';
export * from './Lists/reduce';
export * from './Lists/sort';

// -- Paths
export * from './Lists/Paths/getPath';
export * from './Lists/Paths/hasPath';
export * from './Lists/Paths/mergePaths';
export * from './Lists/Paths/parsePath';

// MISC
export * from './Misc/debouncePromise';
export * from './Misc/getGuid';
export * from './Misc/getLocalStorage';
export * from './Misc/getPageStorage';
export {makeOptions} from './Misc/makeOptions';
export * from './Misc/makeOptions.interfaces';
export * from './Misc/md5';

// STRINGS
export * from './Strings/escapeRegex';
export * from './Strings/getLongestCommonPrefix';
export * from './Strings/getLongestCommonSuffix';
export * from './Strings/getSimilarity';
export * from './Strings/htmlEncode';
export * from './Strings/htmlDecode';
export * from './Strings/lcFirst';
export * from './Strings/maxLength';
export * from './Strings/sanitizeString';
export * from './Strings/stripTags';
export * from './Strings/strReverse';
export * from './Strings/ucFirst';

// -- Inflector
export * from './Strings/Inflector/inflectToArray';
export * from './Strings/Inflector/inflectToCamelBack';
export * from './Strings/Inflector/inflectToCamelCase';
export * from './Strings/Inflector/inflectToDashed';
export * from './Strings/Inflector/inflectToSlug';
export * from './Strings/Inflector/inflectToSpacedUpper';
export * from './Strings/Inflector/inflectToUnderscore';

// -- Validate
export * from './Strings/Validate/validateEmail';
export * from './Strings/Validate/validatePattern';
export * from './Strings/Validate/validateUrl';

// TYPES
export * from './Types/isArray';
export * from './Types/isBool';
export * from './Types/isEmpty';
export * from './Types/isFunction';
export * from './Types/isIterator';
export * from './Types/isMap';
export * from './Types/isNull';
export * from './Types/isNumber';
export * from './Types/isNumeric';
export * from './Types/isObject';
export * from './Types/isPlainObject';
export * from './Types/isSet';
export * from './Types/isString';
export * from './Types/isUndefined';

// UI
export * from './Ui/getDocumentHeight';
export * from './Ui/getScrollPos';
export * from './Ui/getViewportSize';
export * from './Ui/isElementInViewport';
export * from './Ui/scrollToPosition';
export * from './Ui/scrollToTopOf';
export * from './Ui/selectTextOfElement';
export * from './Ui/stickyElement';
export * from './Ui/stopBodyScrolling';
export * from './Ui/throttleEvent';
export * from './Ui/transistClass';

// -- BreakpointService
export * from './Ui/BreakpointService/BreakpointService';
export * from './Ui/BreakpointService/BreakpointService.interfaces';
export * from './Ui/BreakpointService/Entities/Breakpoint';
