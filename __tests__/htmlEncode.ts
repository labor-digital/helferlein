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
 * Last modified: 2020.11.24 at 01:08
 */

import {htmlEncode} from '../src/Strings/htmlEncode';

test('htmlEncode', () => {
    expect(htmlEncode('Dit is e´†®¥¨©˙∫ø…ˆƒ∆÷∑™ƒ∆æøπ£¨ ƒ™en t£eést'))
        .toEqual(
            'Dit is e&#180;&#8224;&#174;&#165;&#168;&#169;&#729;&#8747;&#248;&#8230;&#710;&#402;&#8710;&#247;&#8721;&#8482;&#402;&#8710;&#230;&#248;&#960;&#163;&#168; &#402;&#8482;en t&#163;e&#233;st');
    expect(htmlEncode('<a>Content &#169; <#>&<&#># </a>'))
        .toEqual('&#60;a&#62;Content &#38;#169; &#60;#&#62;&#38;&#60;&#38;#&#62;# &#60;/a&#62;');
});