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
import {requestFrame} from '../Browser/requestFrame';
import {isBrowser} from '../Environment/isBrowser';
import {forEach} from '../Lists/forEach';
import {isString} from '../Types/isString';
import {isUndefined} from '../Types/isUndefined';
import {getScrollPos} from './getScrollPos';
import {throttleEvent} from './throttleEvent';

// The number of milliseconds for each frame / tick
const tickLength = 15;

/**
 * The list of events that might stop the scroll interaction
 */
const scrollEvents = [
    'wheel',
    'mousedown',
    'keydown',
    'touchstart'
];

/**
 * Holds the information about the currently running animations
 */
const runningAnimations = new class
{
    protected containers: Array<Window | HTMLElement>;
    protected resolvers: Array<Function>;
    protected eventHandlers: Array<Function | null>;
    
    constructor()
    {
        this.containers = [];
        this.resolvers = [];
        this.eventHandlers = [];
    }
    
    public startAnimation(container: Window | HTMLElement, resolver: Function, breakOnManualScroll?: boolean)
    {
        const index = this.containers.indexOf(container);
        if (index !== -1) {
            this.stopAnimation(index);
        }
        this.containers.push(container);
        this.resolvers.push(resolver);
        
        if (breakOnManualScroll) {
            const handler = () => {
                this.stopAnimation(container);
            };
            this.eventHandlers.push(handler);
            forEach(scrollEvents, event => {
                container.addEventListener(event, handler);
            });
        } else {
            this.eventHandlers.push(null);
        }
    }
    
    public stopAnimation(container: Window | HTMLElement | number): void
    {
        const otherAnimationWasStarted = typeof container === 'number';
        const index = otherAnimationWasStarted ? container as number : this.containers.indexOf(container as any);
        if (isUndefined(this.resolvers[index])) {
            return;
        }
        this.resolvers[index](otherAnimationWasStarted);
        this.containers.splice(index, 1);
        this.resolvers.splice(index, 1);
        this.eventHandlers.splice(index, 1);
    }
};

/**
 * The used easing function
 * @param p
 */
function easing(p)
{
    return (-0.5 * (Math.cos(Math.PI * p) - 1));
}

// Helper to set the scroll value
function setScrollPos(pos: number, container: Window | HTMLElement): void
{
    if (container === window) {
        (container as Window).scrollTo(0, pos);
    } else {
        (container as HTMLElement).scrollTop = pos;
    }
}

/**
 * Resolves the container selecor into either a window or element instance
 * @param container
 */
function resolveContainer(container: string | Window | HTMLElement): Window | HTMLElement
{
    if (isString(container)) {
        const resolvedContainer = document.querySelector(container as string) as HTMLElement | null;
        
        if (resolvedContainer !== null) {
            return resolvedContainer;
        }
        return window;
    }
    return container as any;
}

/**
 * Can be used to scroll either a container or the whole window to a given position using a smooth animation
 *
 * @param position The pixel position on the Y axis to scroll to
 * @param duration (Default 300) The duration in milliseconds the animation should take
 * @param container (Default window) The container to scroll instead of the window.
 * @param breakOnManualScroll (Default true) By default the animation is stopped when the user manually starts to interact with the scrolling.
 * If you set this to false the scrolling will continue even on interaction
 * Can be a valid selector for document.querySelector() as a string, as well.
 */
export function scrollToPosition(
    position: number,
    duration?: number,
    container?: HTMLElement | Window | string,
    breakOnManualScroll?: boolean
): Promise<HTMLElement | Window | string>
{
    // Noop if not in browser
    if (!isBrowser()) {
        return Promise.resolve(container);
    }
    
    // Prepare input values
    duration = duration || (duration === 0 ? 0 : 300);
    const resolvedContainer = resolveContainer(container || window);
    
    // Start promise chain
    return new Promise(resolve => {
        let c = 1;
        let stopped = false;
        let retry = 0;
        
        // Mark the animation as running
        runningAnimations.startAnimation(resolvedContainer, () => {
            resolve(resolvedContainer);
            stopped = true;
        }, breakOnManualScroll);
        
        // Prepare calculation
        const currentPosition = getScrollPos(resolvedContainer);
        const targetPosition = position;
        const distance = targetPosition - currentPosition;
        const ticks = Math.round(duration / tickLength);
        let expectedPosition = currentPosition;
        
        // Nothing to do
        if (duration === 0 || distance === 0) {
            setScrollPos(targetPosition, resolvedContainer);
            return runningAnimations.stopAnimation(resolvedContainer);
        }
        
        // The animation loop
        const tick = function () {
            if (stopped) {
                return;
            }
            
            // Check if we got to our expected position
            const actualPosition = Math.round(getScrollPos(resolvedContainer as HTMLElement));
            const isCloseEnough = expectedPosition - 10 < actualPosition && expectedPosition + 10 > actualPosition;
            if (!isCloseEnough) {
                // Check if we are still on the right way
                if (retry < 5) {
                    // Try again, for stupid iOs
                    retry++;
                    requestFrame(throttleEvent(tick, tickLength) as any);
                    setScrollPos(expectedPosition, container as HTMLElement);
                    return;
                }
                
                // No? Than there is something wrong here -> go to next position
            }
            retry = 0;
            
            // Check if there is still work to do
            if (c < ticks) {
                const p = easing(c / ticks);
                requestFrame(throttleEvent(tick, tickLength) as any);
                expectedPosition = Math.round(currentPosition + (distance * p));
                setScrollPos(expectedPosition, container as HTMLElement);
            } else {
                setScrollPos(targetPosition, container as HTMLElement);
                return runningAnimations.stopAnimation(resolvedContainer);
            }
            
            // Count up
            c++;
        };
        
        // Start ticking
        tick();
    });
}