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
 * Last modified: 2019.02.15 at 16:59
 */
import {isBrowser} from "../Environment/isBrowser";

interface ViewportSize {
	width: number
	height: number
}

/**
 * Returns the current viewport size as object containing width and height
 */
export function getViewportSize(): ViewportSize {
	if (!isBrowser()) return {width: 0, height: 0};
	return {
		width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	};
}