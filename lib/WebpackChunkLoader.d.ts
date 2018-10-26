/// <reference types="jquery" />
import { WebpackChunkLoaderDefinitionInterface, WebpackChunkLoaderOptions } from "./WebpackChunkLoader.interfaces";
/**
 * @deprecated Use the @labor/webpack-chunk-loader package instead!
 */
export declare class WebpackChunkLoader {
    /**
     * Defines a list of chunks that can be loaded using a dom element (see registerDomChangeChunkLoading())
     * or using a jquery element on the document (chunkLoader__require, pass your chunkname as parameter).
     *
     * @param definitions
     * @param options
     */
    static registerLoader(definitions: WebpackChunkLoaderDefinitionInterface[], options?: WebpackChunkLoaderOptions): void;
    /**
     * This method is used to manually load a list of chunks.
     * Pass an array or a set of chunk names and the method will return a promise which is
     * fulfilled as soon as all chunks are loaded.
     *
     * @param requiredChunks
     */
    static loadChunks(requiredChunks: Array<string> | Set<string>): Promise<Set<string>>;
    /**
     * This helper can be used to register automatic, dom based chunk loading.
     * To define a chunk you can create a script tag like <script data-require-chunks="mychunk,myotherChunk"></script>
     * The script will then load your chunks as if you had requested them using the javascript api
     */
    static registerDomChangeChunkLoading(): void;
    /**
     * This can be used to manually load dom chunks inside a given scope.
     * The syntax is the same as if you would use registerDomChangeChunkLoading(), but
     * the script will only look for chunks inside the given $scope.
     *
     * The method returns a promise that will be fulfilled if all chunks are loaded
     * @param $scope
     */
    static loadChunksInScope($scope: JQuery<any>): Promise<Set<string>>;
}
