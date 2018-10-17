import { WebpackChunkLoaderDefinitionInterface, WebpackChunkLoaderOptions } from "./WebpackChunkLoader.interfaces";
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
     * This helper can be used to register automatic, dom based chunk loading.
     * To define a chunk you can create a script tag like <script data-require-chunks="mychunk,myotherChunk"></script>
     * The script will then load your chunks as if you had requested them using the javascript api
     */
    static registerDomChangeChunkLoading(): void;
}
