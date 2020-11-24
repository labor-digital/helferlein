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
 * Last modified: 2020.11.24 at 00:47
 */

import {validateEmail} from '../src/Strings/Validate/validateEmail';
import {validateUrl} from '../src/Strings/Validate/validateUrl';

test('stringValidation', () => {
    // EMAIL
    expect(validateEmail('f.bar@labor.digital')).toBeTruthy();
    expect(validateEmail('bar.foo-foo@web.net')).toBeTruthy();
    expect(validateEmail('bar.foo-foo@web.co.uk')).toBeTruthy();
    expect(validateEmail('example+label@example.com')).toBeTruthy();
    
    expect(validateEmail('example.com')).toBeFalsy();
    expect(validateEmail('example@example')).toBeFalsy();
    expect(validateEmail('example[AT]example.com')).toBeFalsy();
    expect(validateEmail(['this', 'is', 'array'])).toBeFalsy();
    expect(validateEmail(null)).toBeFalsy();
    
    // URL
    expect(validateUrl('http://example.org')).toBeTruthy();
    expect(validateUrl('https://example.org')).toBeTruthy();
    expect(validateUrl('https://www.example.org')).toBeTruthy();
    expect(validateUrl('https://www.sub.example.org')).toBeTruthy();
    expect(validateUrl('https://www.sub.example.co.uk')).toBeTruthy();
    
    expect(validateUrl('www.web.com')).toBeFalsy();
    expect(validateUrl('example.com')).toBeFalsy();
    expect(validateUrl('example@example')).toBeFalsy();
    expect(validateUrl(['this', 'is', 'array'])).toBeFalsy();
    expect(validateUrl(null)).toBeFalsy();
    
});