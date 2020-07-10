/*
 * Copyright 2020 LABOR.digital
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
 * Last modified: 2020.07.10 at 12:17
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Helper to recursively delete a directory with contents
 * @param dirname The dirname to the directory to delete
 * @param removeSelf If set to false, the parent directory will not be removed
 */
export function rmdirRecursiveSync(dirname: string, removeSelf?: boolean): void
{
    
    if (fs.existsSync(dirname)) {
        fs.readdirSync(dirname).forEach(function (file) {
            var curPath = dirname + path.sep + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                rmdirRecursiveSync(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        if (removeSelf !== false) {
            fs.rmdirSync(dirname);
        }
    }
}