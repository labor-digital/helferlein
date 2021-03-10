/*
 * Copyright 2021 LABOR.digital
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
 * Last modified: 2021.03.10 at 18:34
 */

declare global
{
    var __non_webpack_require__: any;
    var __webpack_require__: any;
}

/**
 * Internal helper to execute a require for node, without breaking webpack in the process.
 * @interface
 * @param module
 */
export function nodeRequire(module: string)
{
    const nodeVer = typeof process !== 'undefined' && process.versions?.node;
    const req = nodeVer
        ? typeof __webpack_require__ === 'function'
            ? __non_webpack_require__
            : require
        : undefined;
    return req(module);
}