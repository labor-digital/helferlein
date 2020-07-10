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
 * Last modified: 2019.01.09 at 15:07
 */
/**
 * Converts a given money format like 2.000.000,00 or 3,000,000.00 or 3.000.000 into regular javascript numbers
 * @param value
 */
export function moneyAsNumber(value: string | number): number
{
    if (typeof value === 'number') {
        value = value + '';
    }
    if (typeof value !== 'string') {
        return -1;
    }
    
    // Check if we can directly convert values
    let valueNumeric = value.replace(/[^0-9,.]/g, '');
    if (parseInt(valueNumeric) + '' === valueNumeric) {
        return parseInt(valueNumeric);
    }
    if (parseFloat(valueNumeric.replace(/,/g, '.')) + '' === valueNumeric.replace(/,/g, '.')) {
        return parseFloat(valueNumeric.replace(/,/g, '.'));
    }
    if (parseFloat(valueNumeric) + '' === valueNumeric) {
        return parseFloat(valueNumeric);
    }
    
    // Try to gather the comma character
    let comma = valueNumeric.substr(-3).replace(/[^.,]/g, '');
    let hasComma = comma.length !== 0;
    
    // Try to find comma in numbers like 98000.00000000003
    if (!hasComma) {
        // Remove everything that looks like a thousand separator
        comma = valueNumeric.replace(/[.,]\d{3}(?=[^\d]|$)/g, '').replace(/[^.,]/g, '').trim();
        // The last char is our comma sign
        if (comma.length > 0) {
            comma = comma.charAt(comma.length - 1);
            hasComma = true;
        }
    }
    comma = hasComma ? comma : ',';
    
    // Special handling if the comma is at the first or the last position
    if (valueNumeric.match(/^[,.]/)) {
        valueNumeric = '0' + value;
    }
    if (valueNumeric.match(/[,.]$/)) {
        valueNumeric = value + '0';
    }
    
    // Clean up the input
    var commaPosition = valueNumeric.split('').reverse().join('').indexOf(comma);
    var decimal = hasComma ? valueNumeric.substr(-commaPosition) : '00';
    let val = hasComma ? valueNumeric.substr(0, valueNumeric.length - (commaPosition)) : valueNumeric;
    val = val.replace(/[^0-9]/g, "");
    
    // Done
    return parseFloat(val + "." + decimal);
}