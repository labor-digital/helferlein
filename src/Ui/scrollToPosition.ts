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
 * Last modified: 2019.02.01 at 14:35
 */
import {throttleEvent} from "./throttleEvent";
import {requestFrame} from "../Browser/requestFrame";
import {getScrollPos} from "./getScrollPos";

// The number of milliseconds for each frame / tick
const tickLength = 15;

// The id of the running animation, or zero
let runningAnimation = 0;

/**
 * The used easing function
 * @param p
 */
function easing(p) {
	return (-0.5 * (Math.cos(Math.PI * p) - 1));
}

/**
 * Can be used to scroll either a container or the whole window to a given position using a smooth animation
 *
 * @param position The pixel position on the Y axis to scroll to
 * @param duration (Default 300) The duration in milliseconds the animation should take
 * @param container (Default window) The container to scroll instead of the window
 */
export function scrollToPosition(position: number, duration?: number, container?: HTMLElement | Window): Promise<HTMLElement | Window> {
	// Make sure we break if a new animation was started
	const localAnimation = Math.random();
	runningAnimation = localAnimation;

	// Prepare input values
	duration = duration || (duration === 0 ? 0 : 300);
	container = container || window;
	const containerIsWindow = container === window;

	// Start promis chain
	return new Promise(resolve => {
		const ticks = Math.floor(duration / tickLength);
		let c = 1;


		// Helper to set the scroll value
		const setScrollPos = function (pos) {
			if (containerIsWindow) (container as Window).scrollTo(0, pos);
			else (container as HTMLElement).scrollTop = pos;
		};

		// Prepare calculation
		const initialPosition = getScrollPos(container as HTMLElement);
		const distance = position - initialPosition;

		// Duration is zero -> No animation
		if (duration === 0) {
			setScrollPos(position);
			resolve(container);
		}

		// Nothing to do
		if (distance === 0) return resolve(container);

		// Marker to detect if the user changed our expected scroll position
		let expectedPosition = Math.ceil(initialPosition);

		// The animation loop
		const tick = function () {
			// Break if another animation was started or something else scrolled
			if (localAnimation !== runningAnimation || (expectedPosition !== Math.ceil(getScrollPos(container as HTMLElement)))) {
				return resolve(container);
			}

			// Check if there is still work to do
			if (c < ticks) {
				const p = easing(c / ticks);
				requestFrame(throttleEvent(tick, tickLength) as any);
				expectedPosition = Math.ceil(initialPosition + (distance * p));
				setScrollPos(expectedPosition);
			} else {
				setScrollPos(position);
				resolve(container);
			}

			// Count up
			c++;
		};

		// Start ticking
		tick();
	});
}