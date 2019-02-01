/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
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