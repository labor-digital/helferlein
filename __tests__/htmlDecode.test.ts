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
 * Last modified: 2021.01.21 at 19:31
 */

import {htmlDecode} from '../src/Strings/htmlDecode';

test('htmlDecode', () => {
    expect(htmlDecode(
        'Dit is e&#180;&#8224;&#174;&#165;&#168;&#169;&#729;&#8747;&#248;&#8230;&#710;&#402;&#8710;&#247;&#8721;&#8482;&#402;&#8710;&#230;&#248;&#960;&#163;&#168; &#402;&#8482;en t&#163;e&#233;st'))
        .toEqual('Dit is e´†®¥¨©˙∫ø…ˆƒ∆÷∑™ƒ∆æøπ£¨ ƒ™en t£eést');
    expect(htmlDecode('&#60;a&#62;Content &#38;#169; &#60;#&#62;&#38;&#60;&#38;#&#62;# &#60;/a&#62;'))
        .toEqual('<a>Content &#169; <#>&<&#># </a>');
    expect(htmlDecode('&nbsp;&shy;&amp;&quot;&lt;&gt;&apos;&euro;&pound;&cent;&copy;'))
        .toEqual(' &"<>\'€£¢©');
});