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
 * Last modified: 2019.01.24 at 17:31
 */
import {isBrowser} from '../../Environment/isBrowser';
import {throttleEvent} from '../../Ui/throttleEvent';
import {EventBus} from '../EventBus';
import {HelferleinEventList} from '../HelferleinEventList';

let isRegistered = false;

/**
 * Registers the "EVENT_RESIZE_THROTTLED" event which is called every time
 * the window is resized, but which has a debounce rate of 150ms
 */
export function registerEventResizeThrottled(): void
{
    if (!isBrowser() || isRegistered) {
        return;
    }
    isRegistered = true;
    window.addEventListener('resize', throttleEvent(() => {
        EventBus.emit(HelferleinEventList.EVENT_RESIZE_THROTTLED);
    }, 150));
}