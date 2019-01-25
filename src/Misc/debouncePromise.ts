/**
 * Created by Martin Neundorfer on 25.01.2019.
 * For LABOR.digital
 */
import {EventBus} from "../Browser/EventBus";

interface PromiseCreator {
	(): Promise<any>
}

interface PromiseRegistryEntry {
	event: string;
	timeout: number | any;
	guid: number;
}

const registry: Map<string, PromiseRegistryEntry> = new Map();

/**
 * Similar to throttleEvent but debounces a promise creating callback.
 * As long as the function gets invoked the promiseCreator will not be executed
 * If the delay of limit milliseconds is passed without the function beeing called,
 * the promiseCreator will be executed and tho the real promise created.
 *
 * All resulting .then() functions will receive the result of the last promise request.
 *
 * @param key A unique key to define a unique promise group
 * @param promiseCreator The function which should only be called after the timeout passed
 * @param limit The timeout in milliseconds before the promise should be called
 * @param skipAllButLast If this is set to true only the last .then() will be executed.
 * Otherwise all .then() methods will be executed, but receive the same result
 */
export function debouncePromise(key: string, promiseCreator: PromiseCreator,
								limit: number, skipAllButLast?: boolean): Promise<any> {
	// Initialize the wrapper if required
	if (!registry.has(key)) {
		const event = "debouncePromise__timeout--" + key;
		registry.set(key, {
			event,
			timeout: 0,
			guid: 0
		});
	}

	// Load config
	const config = registry.get(key);

	// Register timeout
	clearTimeout(config.timeout);
	config.timeout = setTimeout(() => {
		EventBus.emit(config.event, {promiseCreator});
	}, limit);

	return new Promise((resolve, reject) => {
		const localGuid = ++config.guid;
		const callback = function (e) {
			// Clean our callback
			EventBus.unbind(config.event, callback);

			// Check if this is the last promise
			if (localGuid === config.guid) {
				registry.delete(key);
			} else if (skipAllButLast === true) {
				return reject("@skipAllButLast");
			}
			// Call the inner promise
			e.args.promiseCreator().then(resolve).catch(reject);
		};
		EventBus.bind(config.event, callback);
	}).catch((e) => {
		// Check if we should skip all other executions
		if (e === "@skipAllButLast") {
			const noopPromise = {
				finally: () => noopPromise,
				then: () => noopPromise,
				catch: () => noopPromise
			};
			return noopPromise;
		}
		return Promise.reject(e);
	})
}