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
 * Last modified: 2019.06.13 at 21:23
 */

import {getSimilarity} from '../src/Strings/getSimilarity';

test('getSimilarity of single words', () => {
    expect(getSimilarity('Apple', 'Apple')).toEqual(1);
    expect(getSimilarity('Apple', 'Applez')).toEqual(0.8888888888888888);
    expect(getSimilarity('Apple', 'zApple')).toEqual(0.8888888888888888);
    expect(getSimilarity('apple', 'Apple')).toEqual(0.75);
    expect(getSimilarity('aa', 'aaa')).toEqual(0.6666666666666666);
    expect(getSimilarity('foo', 'aFoo')).toEqual(0.4);
    expect(getSimilarity('bar', 'waz')).toEqual(0);
});

test('getSimilarity of texts', () => {
    expect(getSimilarity('THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND',
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND')).toEqual(1);
    expect(getSimilarity('THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND',
        'THE SOFTWARE IS PROVIDED "AS IS"')).toEqual(0.6753246753246753);
    expect(getSimilarity('Permission is hereby granted, free of charge, to any person obtaining a copy',
        'Copyright (c) 2018')).toEqual(0.05128205128205128);
});