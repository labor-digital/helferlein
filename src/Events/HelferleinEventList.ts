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
 * Last modified: 2019.12.23 at 16:30
 */

export enum HelferleinEventList
{
    /**
     * Emitted when the registerEventOnHashChange() helper was invoked.
     * It is triggered every time the user moves in the
     * history forwards or backwards.
     */
    EVENT_ON_HASH_CHANGE = 'hash__change',
    
    /**
     * If you change the hash and don't want EVENT_ON_HASH_CHANGE to be triggered by it,
     * emit this event first and set the args: {new: "#/new/hash"}
     */
    EVENT_HASH_UPDATE = 'hash__update',
    
    /**
     * Emitted when the registerEventResizeThrottled() helper was invoked.
     * It is called every time the window is resized, but which has a debounce rate of 150ms
     */
    EVENT_RESIZE_THROTTLED = 'resize__throttled',
    
    /**
     * Emitted when the registerEventScrollThrottled() helper was invoked.
     * It is called every time the window is scrolled, but which has a debounce rate of 150ms
     */
    EVENT_SCROLL_THROTTLED = 'scroll__throttled',
    
    /**
     * Emitted when the BreakpointService is used.
     * It is called every time when the browser window is resized and the breakpoint was changed
     */
    EVENT_BREAKPOINT_CHANGE = 'breakpoint__change'
}