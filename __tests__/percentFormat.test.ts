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
 * Last modified: 2019.01.09 at 13:43
 */
import {numberAsPercent} from '../src/FormatAndConvert/numberAsPercent';
import {percentAsNumber} from '../src/FormatAndConvert/percentAsNumber';

test('numberAsPercent', () => {
    expect(numberAsPercent(1)).toBe('100,00');
    expect(numberAsPercent(1, true)).toBe('100');
    expect(numberAsPercent(100)).toBe('10.000,00');
    expect(numberAsPercent(0.3333333)).toBe('33,33');
});

test('percentAsNumber', () => {
    expect(percentAsNumber('100,00')).toBe(1);
    expect(percentAsNumber('100')).toBe(1);
    expect(percentAsNumber('10.000,00')).toBe(100);
    expect(percentAsNumber('10.000')).toBe(100);
    expect(percentAsNumber('10,000')).toBe(100);
    expect(percentAsNumber('33,33')).toBe(0.3333);
});