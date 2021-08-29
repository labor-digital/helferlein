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

import {forEach} from '../../src';
import {testFlags} from '../../src/util';

export interface ISuite
{
    (runner: IRunner): void;
}

export interface IRunner<T = boolean | string>
{
    (initial: string, modify: string, expected: T): void;
}

export interface IConcreteRunner<T = any>
{
    (tester: Function | any, a: string, b: string, c: T): void;
}

export function singleRunner(tester: Function | any, initial: string, v: string, expected: string): void
{
    document.body.innerHTML = '<div id="subject" class="' + initial + '"></div>';
    const subject = document.getElementById('subject')!;
    tester(subject, v);
    try {
        expect(subject.className).toEqual(expected);
    } catch (e) {
        throw new Error('FAILED AT initial: ' + v + ' expected: ' + expected);
    }
}

export function listRunner(tester: Function | any, initial: string, v: string, expected: string): void
{
    document.body.innerHTML =
        '<div data-subject class="' + initial + '"></div>' +
        '<div data-subject class="' + initial + '"></div>' +
        '<div data-subject class="' + initial + '"></div>';
    const subjects = document.querySelectorAll('div[data-subject]')!;
    tester(subjects, v);
    forEach(subjects, subject => {
        try {
            (expect(subject.className) as any).toEqual(expected);
        } catch (e) {
            throw new Error('FAILED AT initial: ' + v + ' expected: ' + expected);
        }
    });
}

export function runSuite(runner: IConcreteRunner, tester: Function | any, suite: ISuite, fallback: boolean): void
{
    if (fallback) {
        testFlags.noClassList = true;
    }
    
    suite((a, b, c) => runner(tester, a, b, c));
    
    delete testFlags.noClassList;
}
