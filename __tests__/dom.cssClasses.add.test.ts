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
 * Last modified: 2021.08.29 at 13:28
 */

import {addClass} from '../src';
import {IRunner, listRunner, runSuite, singleRunner} from './__util__/dom.cssClasses.util';

function addSingleSuite(runner: IRunner): void
{
    runner('', 'foo', 'foo');
    runner('foo', 'foo', 'foo');
    runner('foo', 'foo bar', 'foo bar');
    runner('foo bar', 'foo', 'foo bar');
    runner('foo bar', 'baz', 'foo bar baz');
    runner('foo  bar', 'baz', 'foo bar baz');
    runner('foo bar', '', 'foo bar');
}

function addMultipleSuite(runner: IRunner): void
{
    runner('', 'foo bar', 'foo bar');
    runner('foo', 'foo bar', 'foo bar');
    runner('foo', 'foo bar baz', 'foo bar baz');
    runner('baz', 'foo bar', 'baz foo bar');
    runner('foo  bar', 'baz faz', 'foo bar baz faz');
    runner('foo bar', '', 'foo bar');
}

test('add single class to single element', () => {
    runSuite(singleRunner, addClass, addSingleSuite, false);
});

test('add single class to single element (FALLBACK)', () => {
    runSuite(singleRunner, addClass, addSingleSuite, true);
});

test('add multiple classes to single element', () => {
    runSuite(singleRunner, addClass, addMultipleSuite, false);
});

test('add multiple classes to single element (FALLBACK)', () => {
    runSuite(singleRunner, addClass, addMultipleSuite, true);
});

test('add single class to multiple elements', () => {
    runSuite(listRunner, addClass, addSingleSuite, false);
});

test('add single class to multiple elements (FALLBACK)', () => {
    runSuite(listRunner, addClass, addSingleSuite, true);
});

test('add multiple classes to multiple elements', () => {
    runSuite(listRunner, addClass, addMultipleSuite, false);
});

test('add multiple classes to multiple elements (FALLBACK)', () => {
    runSuite(listRunner, addClass, addMultipleSuite, true);
});

// function removeSuite(runner: IRunner): void
// {
//     runner('', 'foo', '');
//     runner('foo', 'foo', '');
//     runner('foo bar', 'foo', 'bar');
//     runner('foo bar', 'baz', 'foo bar');
//     runner('foo bar baz', 'baz', 'foo bar');
//     runner('foo  bar', 'baz', 'foo bar');
//     runner('foo bar', '', 'foo bar');
// }
//
// test('remove single class to single element', () => {
//     runSuite(singleRunner, removeClass, removeSuite, false);
// });
//
// test('remove single class to single element (FALLBACK)', () => {
//     runSuite(singleRunner, removeClass, removeSuite, true);
// });
