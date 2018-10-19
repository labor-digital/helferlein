/**
 * Created by Martin Neundorfer on 16.10.2018.
 * For LABOR.digital
 */
export interface WebpackChunkLoaderLoaderInterface extends Function {
    /**
     * Should contain the webpack dynamic import like: return import("myFile.js");
     * This is required so that webpack can parse the sources for it's chunk building
     */
    (chunk: string): Promise<any>;
}
export interface WebpackChunkLoaderOptions {
    /**
     * The number of milliseconds before a chunk request should be marked as "timedout"
     */
    timeout?: number;
    /**
     * Can be used to add additional events for the chunkloader to listen on.
     * Use this like a jquery event definition
     */
    additionalEvents?: string;
    /**
     * If set to true, the chunkloader will trigger a domChange event on the document
     * every time a chunk was loaded
     */
    domChangeOnChunkLoad?: boolean;
}
export interface WebpackChunkLoaderOnErrorCallbackInterface extends Function {
    (requiredChunk?: string, err?: string): void;
}
export interface WebpackChunkLoaderCallbackInterface extends Function {
    (requiredChunk?: string): void;
}
export interface WebpackChunkLoaderDefinitionInterface {
    /**
     * The name of the chunk to be loaded (Used for event based chunk loading)
     */
    name: string | RegExp;
    /**
     * Most likely a closure, that defines the webpack import() statement and should return the Promise
     * by "import()"
     */
    loader: WebpackChunkLoaderLoaderInterface;
    /**
     * A list of other chunknames this chunk depends on
     */
    dependencies?: Array<string>;
}
