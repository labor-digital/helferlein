interface WebpackChunkLoaderLoaderInterface extends Function {
    /**
     * Should contain the webpack dynamic import like: return import("myFile.js");
     * This is required so that webpack can parse the sources for it's chunk building
     */
    (): Promise<any>;
}
interface WebpackChunkLoaderCallbackInterface extends Function {
    (): Promise<any>;
}
interface WebpackChunkLoaderDefinitionInterface {
    name: string;
    loader: WebpackChunkLoaderLoaderInterface;
    callback?: WebpackChunkLoaderCallbackInterface;
}
/**
 * Defines a list of possible
 * @param definitions
 */
export declare function webpackChunkLoader(definitions: WebpackChunkLoaderDefinitionInterface[]): void;
/**
 * This helper can be used to register automatic, dom based chunk loading.
 * To define a chunk you can create a script tag like <script data-require-chunks="mychunk,myotherChunk"></script>
 * The script will then load your chunks as if you had requested them using the javascript api
 */
export declare function registerDomChangeChunkLoading(): void;
export {};
