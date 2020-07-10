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
 * Last modified: 2019.07.25 at 14:31
 */

import {isNumeric} from '../src/Types/isNumeric';

test('isNumeric', () => {
    expect(isNumeric([])).toBe(false);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('123.5354')).toBe(true);
    expect(isNumeric('.5354')).toBe(true);
    expect(isNumeric('0.5354')).toBe(true);
    expect(isNumeric([123, 2345, 35464, 'asdf'])).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric({'a': 'b'})).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric('string')).toBe(false);
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric(123.12)).toBe(true);
    expect(isNumeric(NaN)).toBe(false);
});