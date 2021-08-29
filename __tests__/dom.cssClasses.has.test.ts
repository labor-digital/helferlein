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
 * Last modified: 2021.08.29 at 14:52
 */


import {hasClass} from '../src';
import {IRunner, runSuite} from './__util__/dom.cssClasses.util';

function hasSingleRunner(tester: Function | any, initial: string, v: string, expected: string): void
{
    document.body.innerHTML = '<div id="subject" class="' + initial + '"></div>';
    const subject = document.getElementById('subject')!;
    try {
        expect(tester(subject, v)).toEqual(expected);
    } catch (e) {
        throw new Error('FAILED AT initial: ' + initial + 'check: ' + v + ' expected: ' + expected);
    }
}

function hasSingleSuite(runner: IRunner<boolean>): void
{
    runner('foo', 'foo', true);
    runner('foo', 'bar', false);
    runner('foo bar', 'bar', true);
    runner('foo barbar', 'bar', false);
    runner('foo barbar', 'foo', true);
    runner('foo', '', false);
}

function hasMultipleSuite(runner: IRunner<boolean>): void
{
    runner('foo', 'foo bar', false);
    runner('foo', 'bar foo', false);
    runner('foo bar', 'bar foo', true);
    runner('foo barbar', 'foo bar', false);
    runner('foo barbar bar', 'barbar bar', true);
    runner('foo', '', false);
}

test('has single class on single element', () => {
    runSuite(hasSingleRunner, hasClass, hasSingleSuite, false);
});

test('has multiple class on single element', () => {
    runSuite(hasSingleRunner, hasClass, hasMultipleSuite, false);
});