/**
 * Created by Martin Neundorfer on 27.09.2018.
 * For LABOR.digital
 */
import $globj from "./$globj";
import { forEach } from "./forEach";
// Stores the regex expressions and their string keys
const regexChunkNames = new Map();
// Stores the list of all loaded chunks
const loadedChunks = new Set();
// Stores the list of all chunks that wait to be loaded
const waitingChunks = new Set();
// Stores the list of all chunks waiting to be loaded
const callbackQueue = new Map();
// Stores the list of all known chunk definitions we may load
const chunkDefinitions = new Map();
// True if domChange chunk loading is registered
let domChangeChunkLoadingRegistered = false;
/**
 * Helper to make sure we compare apples with apples when it comes to chunkNames
 * that can be resolved with regular expressions
 *
 * @param chunkName
 */
function translateRegexChunkNames(chunkName) {
    if (chunkDefinitions.has(chunkName))
        return chunkName;
    forEach(regexChunkNames, (regex, pseudoChunkName) => {
        if (!chunkName.match(regex))
            return;
        chunkName = pseudoChunkName;
        return false;
    });
    return chunkName;
}
export class WebpackChunkLoader {
    /**
     * Defines a list of chunks that can be loaded using a dom element (see registerDomChangeChunkLoading())
     * or using a jquery element on the document (chunkLoader__require, pass your chunkname as parameter).
     *
     * @param definitions
     * @param options
     */
    static registerLoader(definitions, options) {
        // Store given definitions
        forEach(definitions, (v) => {
            if (typeof v.name !== "string") {
                const pseudoChunkName = "regexp-" + regexChunkNames.size;
                regexChunkNames.set(pseudoChunkName, v.name);
                v.name = pseudoChunkName;
            }
            chunkDefinitions.set(v.name, v);
        });
        // Prepare events to listen on
        const events = (typeof options.additionalEvents === "string" ? options.additionalEvents + " " : "")
            + "chunkLoader__require";
        // Register eventhandler
        $globj.document.on(events, function webpackChunkLoaderListener(e, chunk, callback) {
            // Ignore if there is no chunk
            if (typeof chunk !== "string") {
                console.error("No chunk given in a chunkLoader__require event!");
                return;
            }
            // Translate to real chunkname -> Resolve regex names in definition list
            const chunkInternal = translateRegexChunkNames(chunk);
            // Add callback to queue
            if (typeof callback === "function") {
                if (!callbackQueue.has(chunk))
                    callbackQueue.set(chunk, []);
                callbackQueue.get(chunk).push(callback);
            }
            let timeoutMarker = 0;
            // Handle loading
            (new Promise((resolve, reject) => {
                // Check if chunk is already loaded
                if (loadedChunks.has(chunk))
                    return resolve(true);
                // Check if chunk is waiting
                if (waitingChunks.has(chunk))
                    return resolve("wait");
                // Check if we have this chunk
                if (!chunkDefinitions.has(chunkInternal))
                    return reject("Invalid chunk \"" + chunk + "\" requested!");
                // Mark as waiting
                waitingChunks.add(chunk);
                // Create a new request
                const definition = chunkDefinitions.get(chunkInternal);
                // Load dependencies if there are some
                const dependencies = [Promise.resolve()];
                if (Array.isArray(definition.dependencies)) {
                    forEach(definition.dependencies, (dependency) => {
                        dependencies.push(new Promise(resolve1 => {
                            $globj.document.trigger("chunkLoader__require", [dependency, () => {
                                    resolve1();
                                }]);
                        }));
                    });
                }
                // Marker to let the script timeout
                timeoutMarker = setTimeout(() => reject("Could not load the required chunk: " + chunk), typeof options.timeout === "number" ? options.timeout : 5000);
                // Wait until all dependencies are loaded
                Promise.all(dependencies)
                    .then(() => {
                    // Load the real chunk
                    definition.loader(chunk)
                        .then(() => {
                        clearTimeout(timeoutMarker);
                        resolve(true);
                    })
                        .catch(err => {
                        reject(err);
                    });
                })
                    .catch(err => {
                    reject(err);
                });
            }))
                .then((status) => {
                // Skip if we are waiting
                if (status === "wait")
                    return;
                // Get Callback list
                const callbacks = callbackQueue.get(chunk);
                callbackQueue.delete(chunk);
                if (typeof callbacks !== "undefined") {
                    forEach(callbacks, callback => {
                        callback(chunk);
                    });
                }
                // Mark as loaded
                loadedChunks.add(chunk);
                waitingChunks.delete(chunk);
                // Trigger domChange if required
                if (typeof callbacks === "undefined" || callbacks.length === 0)
                    $globj.document.trigger("domChange");
            })
                .catch(err => {
                // Remove from waiting chunks
                waitingChunks.delete(chunk);
                callbackQueue.delete(chunk);
                throw new Error(err);
            });
        });
    }
    /**
     * This helper can be used to register automatic, dom based chunk loading.
     * To define a chunk you can create a script tag like <script data-require-chunks="mychunk,myotherChunk"></script>
     * The script will then load your chunks as if you had requested them using the javascript api
     */
    static registerDomChangeChunkLoading() {
        // Ignore if already registered
        if (domChangeChunkLoadingRegistered === true)
            return;
        domChangeChunkLoadingRegistered = true;
        // Register callback to parse chunk definitions in list
        $globj.document.on("domChange", (e) => {
            // Store the list of required chunks
            const requiredChunks = new Set();
            // Loop over all requirements
            let $scope = $(e.target);
            forEach($scope.find("script[data-require-chunks]"), ($e) => {
                let chunks = $e.data("require-chunks");
                if (typeof chunks !== "string")
                    return;
                chunks = chunks.split(",").map(v => v.trim());
                for (let i = 0; i < chunks.length; i++)
                    requiredChunks.add(chunks[i]);
            });
            // Ignore if empty
            if (requiredChunks.size === 0)
                return;
            // Require parsed chunks from real chunkloader
            forEach(requiredChunks, (chunk) => {
                const chunkInternal = translateRegexChunkNames(chunk);
                // Ignore if the chunk is already loaded
                if (loadedChunks.has(chunkInternal))
                    return;
                // Fail silently if we don't know the chunk
                if (!chunkDefinitions.has(chunkInternal))
                    return;
                // Require the chunk
                $globj.document.trigger("chunkLoader__require", [chunk]);
            });
        });
    }
}
