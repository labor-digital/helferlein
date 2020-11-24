/*
 * Copyright 2019 LABOR.digital
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
 * Last modified: 2019.01.22 at 12:25
 */
import {isString} from '..';

/**
 * Takes a file size in bytes and formats it into a human readable file size string
 * The basic implementation is from: https://stackoverflow.com/a/20732091
 * @param input
 */
export function numberAsFileSize(input: number | string): string
{
    let inputNumber: number = isString(input) ? parseInt(input as string) : input as number;
    if (inputNumber === 0) {
        return '';
    }
    const i: number = Math.floor(Math.log(inputNumber) / Math.log(1024));
    return (inputNumber / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}