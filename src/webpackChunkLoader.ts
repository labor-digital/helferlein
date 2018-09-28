/**
 * Created by Martin Neundorfer on 27.09.2018.
 * For LABOR.digital
 */
import {forEach} from "./forEach";

interface WebpackChunkLoaderLoaderInterface extends Function
{
	/**
	 * Should contain the webpack dynamic import like: return import("myFile.js");
	 * This is required so that webpack can parse the sources for it's chunk building
	 */
	(): Promise<any>
}

interface WebpackChunkLoaderCallbackInterface extends Function
{
	(): Promise<any>
}

interface WebpackChunkLoaderDefinitionInterface
{
	name: string,
	loader: WebpackChunkLoaderLoaderInterface,
	callback?: WebpackChunkLoaderCallbackInterface
}

// Stores the list of all loaded chunks
const loadedChunks = new Set();

// Stores the list of all known chunk definitions we may load
const chunkDefinitions: Map<string, WebpackChunkLoaderDefinitionInterface> = new Map();

// True if the eventhandler was registered
let initializedEventHandler: boolean = false;

// Holds the document's jquery object
const $doc: JQuery = jQuery(document as any) as JQuery;

// True if domChange chunk loading is registered
let domChangeChunkLoadingRegistered = false;

/**
 * Defines a list of possible
 * @param definitions
 */
export function webpackChunkLoader(definitions: WebpackChunkLoaderDefinitionInterface[])
{
	// Store given definitions
	forEach(definitions, (v: WebpackChunkLoaderDefinitionInterface) => {
		chunkDefinitions.set(v.name, v);
	});
	
	// Check if the eventlistener is already registered -> skip
	if (initializedEventHandler !== false) return;
	initializedEventHandler = true;
	
	$doc.on("chunkLoader__require", function webpackChunkLoaderListener(
		e: JQuery.Event, chunk?: string, callback?: Function
	) {
		
		function onChunkLoaded()
		{
			// This calls the callback that the event gave us not the definition callback
			if (typeof callback === "function") callback();
			else $doc.trigger("domChange");
		}
		
		// Check if the chunk was already loaded
		if (loadedChunks.has(chunk))
		{
			onChunkLoaded();
			return;
		}
		
		// Check if we have this chunk
		if (!chunkDefinitions.has(chunk))
			throw new Error("Invalid chunk \"" + chunk + "\" requested!");
		
		// Execute the loader
		const definition = chunkDefinitions.get(chunk);
		definition
			.loader()
			.then(() => {
				// No callback given
				if (typeof definition.callback !== "function") return new Promise(resolve => resolve(true));
				// Return callback result -> should be a promise
				return definition.callback();
			})
			.then(() => {
				
				// Trigger event
				$doc.trigger("chunkLoader__loaded", [chunk]);
				loadedChunks.add(chunk);
				
				// Execute custom callback
				onChunkLoaded();
			})
			.catch(() => {
				throw new Error("Error while loading chunk: \"" + chunk + "\"");
			});
	});
}

/**
 * This helper can be used to register automatic, dom based chunk loading.
 * To define a chunk you can create a script tag like <script data-require-chunks="mychunk,myotherChunk"></script>
 * The script will then load your chunks as if you had requested them using the javascript api
 */
export function registerDomChangeChunkLoading()
{
	// Ignore if already registered
	if(domChangeChunkLoadingRegistered === true) return;
	domChangeChunkLoadingRegistered = true;
	
	// Register callback to parse chunk definitions in list
	$doc.on("domChange", (e) => {
		// Store the list of required chunks
		const requiredChunks = new Set();
		
		// Loop over all requirements
		let $scope = $(e.target);
		forEach($scope.find('script[data-require-chunks]'), ($e:JQuery) => {
			let chunks = $e.data('require-chunks');
			if(typeof chunks !== 'string') return;
			chunks = chunks.split(',').map(v => v.trim());
			for(let i = 0; i < chunks.length; i++)
				requiredChunks.add(chunks[i]);
		});
		
		// Ignore if empty
		if(requiredChunks.size === 0) return;
		
		// Require parsed chunks from real chunkloader
		forEach(requiredChunks, (chunk) => {
			// Ignore if the chunk is already loaded
			if(loadedChunks.has(chunk)) return;
			// Fail silently if we don't know the chunk
			if(!chunkDefinitions.has(chunk)) return;
			// Require the chunk
			$doc.trigger("chunkLoader__require", [chunk]);
		});
		
	});
}