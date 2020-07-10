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
 * Last modified: 2020.07.10 at 13:56
 */
import * as fs from 'fs';
import * as path from 'path';
import {mkdirRecursiveSync} from './mkdirRecursiveSync';

/**
 * Copies a single file from a source location to a target location
 * @param source The absolute path to the source file
 * @param target Either the absolute file name of an existing directory, or the absolute file path to copy to
 * @private
 */
function _copyFileSync(source: string, target: string): void
{
    // Check if target is a directory a new file with the same name will be created
    if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
        target = path.join(target, path.basename(source));
    }
    
    fs.writeFileSync(target, fs.readFileSync(source));
}

/**
 * Copies a folder from a source location to a target location
 * @param source The absolute path to the source directory
 * @param target The absolute path to the directory to copy to
 * @private
 */
function _copyFolderRecursiveSync(source: string, target: string): void
{
    // Check if folder needs to be created
    if (!fs.existsSync(target)) {
        mkdirRecursiveSync(target);
    }
    
    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source)
          .forEach(function (file) {
              const currentSource = path.join(source, file);
              const currentTarget = path.join(target, path.basename(file));
              if (fs.lstatSync(currentSource).isDirectory()) {
                  _copyFolderRecursiveSync(currentSource, currentTarget);
              } else {
                  _copyFileSync(currentSource, currentTarget);
              }
          });
    }
}

/**
 * Copies either a single file or a whole directory to a given target location
 * @param source The absolute path to the source file or directory
 * @param target Either the absolute path of a directory, or the absolute file path to copy to
 */
export function copy(source: string, target: string): void
{
    if (fs.lstatSync(source).isDirectory()) {
        _copyFolderRecursiveSync(source, target);
    } else {
        _copyFileSync(source, target);
    }
}