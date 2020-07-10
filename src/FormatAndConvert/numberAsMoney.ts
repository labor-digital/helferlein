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
 * Last modified: 2019.01.09 at 11:18
 */
/**
 * This helper can be used to convert a number value into a formatted money string.
 * The output format will be 1.000.000,00 or 1.000.000 if "dropDecimals" is set to true
 * @param value The value to convert into a number format
 * @param dropDecimals True to drop the decimal numbers in the output
 * @param thousandSeparator Set to FALSE to disable the thousand separators
 */
export function numberAsMoney(value: number | string, dropDecimals?: boolean, thousandSeparator?: boolean): string
{
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    if (typeof value !== 'number' || isNaN(value)) {
        return 'ERR';
    }
    // Make sure every browser has the correct base format
    let result = (Math.round(value * 100) / 100).toFixed(2);
    
    if (dropDecimals) {
        result = result.replace(/\..*?$/g, '');
        if (thousandSeparator !== false) {
            return result.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
        }
    } else {
        result = result.replace(/\./g, ',');
        if (thousandSeparator !== false) {
            return result.replace(/(\d)(?=(\d{3})+,)/g, "$1.");
        }
    }
    return result;
}