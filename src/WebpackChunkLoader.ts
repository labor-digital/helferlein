/**
 * Created by Martin Neundorfer on 27.09.2018.
 * For LABOR.digital
 */
import $globj from "./$globj";
import {
	WebpackChunkLoaderCallbackInterface,
	WebpackChunkLoaderDefinitionInterface,
	WebpackChunkLoaderOnErrorCallbackInterface,
	WebpackChunkLoaderOptions
} from "./WebpackChunkLoader.interfaces";
import {forEach} from "./forEach";

// Stores the regex expressions and their string keys
const regexChunkNames: Map<string, RegExp> = new Map();

// Stores the list of all known chunk definitions we may load
const chunkDefinitions: Map<string, WebpackChunkLoaderDefinitionInterface> = new Map();

// True if registerLoader() was called
let chunkLoaderRegistered = false;

// True if domChange chunk loading is registered
let domChangeChunkLoadingRegistered = false;

// Holds the current configuration for the chunkloader
const chunkLoaderOptions: WebpackChunkLoaderOptions = {
	timeout: 5000,
	additionalEvents: "",
	domChangeOnChunkLoad: false
};

// The list of all chunk demands that were required by us
const chunkRequests: Map<string, Promise<string>> = new Map();

/**
 * Helper to make sure we compare apples with apples when it comes to chunkNames
 * that can be resolved with regular expressions
 *
 * @param chunkName
 */
function translateRegexChunkNames(chunkName: string): string {
	if (chunkDefinitions.has(chunkName)) return chunkName;
	forEach(regexChunkNames, (regex, pseudoChunkName: string) => {
		if (!chunkName.match(regex)) return;
		chunkName = pseudoChunkName;
		return false;
	});
	return chunkName;
}

/**
 * Receives a chunkname and loads it, after its dependencies have been loaded.
 * @param chunkName The name of the chunk to load
 * @param path Internal var used to detect circular dependencies
 */
function loadSingleChunk(chunkName: string, path?: Array<string>): Promise<string> {

	// Check if this is a circular dependency
	if (!Array.isArray(path)) path = [];
	if (path.indexOf(chunkName) !== -1)
		throw new Error("Circular chunk dependency! Path: " + path.join(" -> ") + " -> " + chunkName);
	path.push(chunkName);

	// Trigger request event
	$globj.document.trigger("chunkLoader__required", [chunkName]);

	// Check if we already know the request
	if (chunkRequests.has(chunkName)) return chunkRequests.get(chunkName);

	// Create a new request
	const request: Promise<string> = new Promise((resolve, reject) => {

		// Handler to check if we ran into a timeout
		let timeoutMarker: any = 0;

		// Translate to real chunkname -> Resolve regex names in definition list
		const chunkInternal = translateRegexChunkNames(chunkName);

		// Check if we have this chunk
		if (!chunkDefinitions.has(chunkInternal)) return reject("Invalid chunk \"" + chunkName + "\" requested!");

		// Get the chunk definition
		const definition = chunkDefinitions.get(chunkInternal);

		// Marker to let the script timeout
		timeoutMarker = setTimeout(() => {
			reject("TIMEOUT: Could not load the required chunk: " + chunkName)
		}, chunkLoaderOptions.timeout);

		// Load dependencies if there are some
		const dependencies = [];
		if (Array.isArray(definition.dependencies)) {
			forEach(definition.dependencies, (dependency) => {
				dependencies.push(loadSingleChunk(dependency, path))
			});
		}

		// Wait until all dependencies are loaded
		Promise
			.all(dependencies)
			.then(() => {
				// Load the real chunk
				definition
					.loader(chunkName)
					.then(() => {

						// Stop timeout callback
						clearTimeout(timeoutMarker);

						// Mark as done
						resolve(chunkName);

						// Trigger events when done
						$globj.document.trigger("chunkLoader__done", [chunkName]);
						if (chunkLoaderOptions.domChangeOnChunkLoad)
							$globj.document.trigger("domChange");
					})
					.catch(err => {
						reject(err);
					});
			})
			.catch(err => {
				reject(err);
			});
	});
	chunkRequests.set(chunkName, request);
	return request;
}

export class WebpackChunkLoader {

	/**
	 * Defines a list of chunks that can be loaded using a dom element (see registerDomChangeChunkLoading())
	 * or using a jquery element on the document (chunkLoader__require, pass your chunkname as parameter).
	 *
	 * @param definitions
	 * @param options
	 */
	static registerLoader(definitions: WebpackChunkLoaderDefinitionInterface[],
						  options?: WebpackChunkLoaderOptions) {

		// Make sure we don't register the loader multiple times
		if (chunkLoaderRegistered)
			throw new Error("You can not register the chunkloader multiple times!");

		// Set options
		if (typeof options !== "object") options = {};
		if (typeof options.timeout === "number") chunkLoaderOptions.timeout = options.timeout;
		if (typeof options.additionalEvents === "string") chunkLoaderOptions.additionalEvents = options.additionalEvents;
		if (typeof options.domChangeOnChunkLoad === "boolean") chunkLoaderOptions.domChangeOnChunkLoad = options.domChangeOnChunkLoad;

		// Store given definitions
		forEach(definitions, (v: WebpackChunkLoaderDefinitionInterface) => {
			if (typeof v.name !== "string") {
				const pseudoChunkName = "regexp-" + regexChunkNames.size;
				regexChunkNames.set(pseudoChunkName, v.name as RegExp);
				v.name = pseudoChunkName;
			}
			chunkDefinitions.set(v.name, v);
		});

		// Prepare events to listen on
		const events = (typeof chunkLoaderOptions.additionalEvents === "string" ? chunkLoaderOptions.additionalEvents + " " : "")
			+ "chunkLoader__require";

		// Register eventhandler
		$globj.document.on(events, function webpackChunkLoaderListener(
			e: JQuery.Event, requiredChunk?: string, callback?: WebpackChunkLoaderCallbackInterface,
			onError?: WebpackChunkLoaderOnErrorCallbackInterface
		) {
			// Ignore if there is no chunk
			if (typeof requiredChunk !== "string") {
				console.error("No chunk given in a chunkLoader__require event!");
				return;
			}

			// Allow comma separated chunk lists
			const requiredChunkList = requiredChunk.split(",").map(v => v.trim());
			WebpackChunkLoader
				.loadChunks(requiredChunkList)
				.then(() => {
					if (typeof callback === "function") callback(requiredChunk);
				})
				.catch(err => {
					if (typeof onError === "function") onError(requiredChunk, err);
					else throw new Error("Could not load required chunk: \"" + requiredChunk + "\"");
				});
		});
	}

	/**
	 * This method is used to manually load a list of chunks.
	 * Pass an array or a set of chunk names and the method will return a promise which is
	 * fulfilled as soon as all chunks are loaded.
	 *
	 * @param requiredChunks
	 */
	static loadChunks(requiredChunks: Array<string> | Set<string>): Promise<Set<string>> {
		return new Promise((resolve, reject) => {
			// Convert input into a set if it is an array
			if (Array.isArray(requiredChunks)) {
				const requiredChunksTranslated: Set<string> = new Set();
				forEach(requiredChunks as Array<string>, v => {
					requiredChunksTranslated.add(v)
				});
				requiredChunks = requiredChunksTranslated;
			}

			// Require all chunks
			const chunkLoadingPromises = [];
			forEach(requiredChunks, (chunkName) => {
				chunkLoadingPromises.push(loadSingleChunk(chunkName));
			});

			// Wait until everything is loaded
			Promise
				.all(chunkLoadingPromises)
				.then(() => resolve(requiredChunks as Set<string>))
				.catch(err => reject(err))
		});
	}

	/**
	 * This helper can be used to register automatic, dom based chunk loading.
	 * To define a chunk you can create a script tag like <script data-require-chunks="mychunk,myotherChunk"></script>
	 * The script will then load your chunks as if you had requested them using the javascript api
	 */
	static registerDomChangeChunkLoading() {
		// Ignore if already registered
		if (domChangeChunkLoadingRegistered === true) return;
		domChangeChunkLoadingRegistered = true;

		// Register callback to parse chunk definitions in list
		$globj.document.on("domChange", (e) => {
			// Loop over all requirements inside the event scope
			WebpackChunkLoader.loadChunksInScope($(e.target));
		});
	}

	/**
	 * This can be used to manually load dom chunks inside a given scope.
	 * The syntax is the same as if you would use registerDomChangeChunkLoading(), but
	 * the script will only look for chunks inside the given $scope.
	 *
	 * The method returns a promise that will be fulfilled if all chunks are loaded
	 * @param $scope
	 */
	static loadChunksInScope($scope: JQuery<any>): Promise<Set<string>> {

		// Store the list of required chunks
		const requiredChunks: Set<string> = new Set();

		// Loop over all
		forEach($scope.find("script[data-require-chunks]"), ($e: JQuery) => {
			let chunks = $e.data("require-chunks");
			if (typeof chunks !== "string") return;
			chunks = chunks.split(",").map(v => v.trim());
			for (let i = 0; i < chunks.length; i++)
				requiredChunks.add(chunks[i]);
		});

		// Submit to chunkloader
		return WebpackChunkLoader.loadChunks(requiredChunks);
	}
}