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
 * Last modified: 2019.02.01 at 14:36
 */
import {isBrowser} from '../Environment/isBrowser';
import {isUndefined} from '../Types/isUndefined';

/**
 * Returns the vertical scroll position of either the window or the given container object
 * Returns 0 if not called in a browser
 *
 * @param container An optional container element to get the scroll position of, otherwise the window is used
 * @param horizontal If set to true the horizontal (X) scroll position is returned, instead of the default (Y)
 */
export function getScrollPos(container?: HTMLElement | Window, horizontal?: boolean): number
{
    if (!isBrowser()) {
        return 0;
    }
    if (isUndefined(container) || container === window) {
        return horizontal === true ?
            window.scrollX || window.pageXOffset || document.documentElement.scrollLeft :
            window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    }
    return horizontal === true ? (container as HTMLElement).scrollLeft : (container as HTMLElement).scrollTop;
}