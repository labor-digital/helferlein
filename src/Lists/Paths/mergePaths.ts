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
 * Last modified: 2019.06.12 at 11:50
 */

import {forEach, isUndefined, parsePath} from '../..';

/**
 * This function can be used to merge two path's together.
 * This becomes useful if you want to work with a dynamic part in form of an array
 * and a static string part. The result will always be a path array.
 * You can specify a separator type for each part of the given path if you merge
 * differently formatted paths.
 *
 * It merges stuff like:
 *        - "a.path.to." and ["parts","inTheTree"] => ["a", "path", "to", "parts", "inTheTree"]
 *        - "a.b.*" and "c.d.[asdf|id]" => ["a", "b", "*", "c", "d", "[asdf|id]"
 *        - "a.b" and "c,d" => ["a","b","c","d"] (If $separatorB is set to ",")
 * and so on...
 *
 * @param pathA      The path to add $pathB to
 * @param pathB      The path to be added to $pathA
 * @param separatorA The separator for string paths in $pathA
 * @param separatorB The separator for string paths in $pathB
 */
export function mergePaths(pathA, pathB, separatorA?: string, separatorB?: string): Array<string>
{
    if (isUndefined(separatorA)) {
        separatorA = '.';
    }
    if (isUndefined(separatorB)) {
        separatorB = separatorA;
    }
    const partsA = parsePath(pathA, separatorA);
    const partsB = parsePath(pathB, separatorB);
    forEach(partsB, (p) => partsA.push(p));
    return partsA;
}