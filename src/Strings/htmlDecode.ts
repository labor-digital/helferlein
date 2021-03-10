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
 * Last modified: 2021.01.21 at 19:29
 */

const translationPattern = /&(nbsp|amp|shy|quot|lt|gt|apos|euro|pound|cent|copy);/g;
const translationMap = {
    nbsp: ' ',
    shy: '',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
    apos: '\'',
    euro: '€',
    pound: '£',
    cent: '¢',
    copy: '©'
};

/**
 * Does the opposite of htmlEncode, and converts all html special characters into their real value.
 * NOTE: Not all named references are supported! Please use another library like html-entities
 * if you need more characters
 *
 * @param code
 */
export function htmlDecode(code: string): string
{
    return code.replace(translationPattern, function (_, value) {
        return translationMap[value];
    }).replace(/&#(\d+);/gi, function (_, number) {
        return String.fromCharCode(parseInt(number, 10));
    });
}