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

import {removeClass} from '../src';
import {IRunner, listRunner, runSuite, singleRunner} from './__util__/dom.cssClasses.util';

function removeSingleSuite(runner: IRunner): void
{
    runner('', 'foo', '');
    runner('baz', 'foo', 'baz');
    runner('foo', 'foo', '');
    runner('foo bar', 'foo', 'bar');
    runner('foo bar', 'baz', 'foo bar');
    runner('foo bar baz', 'baz', 'foo bar');
    runner('foo  bar', 'baz', 'foo bar');
    runner('foo bar', '', 'foo bar');
}

function removeMultipleSuite(runner: IRunner): void
{
    runner('', 'foo bar', '');
    runner('baz', 'foo bar', 'baz');
    runner('foo', 'foo bar', '');
    runner('foo bar faz baz', 'foo bar baz', 'faz');
    runner('foo  bar', 'bar faz', 'foo');
    runner('foo  bar', 'baz faz', 'foo bar');
    runner('foo bar', '', 'foo bar');
}

test('remove single class to single element', () => {
    runSuite(singleRunner, removeClass, removeSingleSuite, false);
});

test('remove single class to single element (FALLBACK)', () => {
    runSuite(singleRunner, removeClass, removeSingleSuite, true);
});

test('remove multiple classes to single element', () => {
    runSuite(singleRunner, removeClass, removeMultipleSuite, false);
});

test('remove multiple classes to single element (FALLBACK)', () => {
    runSuite(singleRunner, removeClass, removeMultipleSuite, true);
});

test('remove single class to multiple elements', () => {
    runSuite(listRunner, removeClass, removeSingleSuite, false);
});

test('remove single class to multiple elements (FALLBACK)', () => {
    runSuite(listRunner, removeClass, removeSingleSuite, true);
});

test('remove multiple classes to multiple elements', () => {
    runSuite(listRunner, removeClass, removeMultipleSuite, false);
});

test('remove multiple classes to multiple elements (FALLBACK)', () => {
    runSuite(listRunner, removeClass, removeMultipleSuite, true);
});
