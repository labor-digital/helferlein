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
 * Last modified: 2019.01.09 at 11:10
 */

let k: any = [], i = 0;
for (; i < 64;) {
    k[i] = 0 | (Math.abs(Math.sin(++i)) * 4294967296);
}

/**
 * The smallest md5 hash implementation I found on the internets.
 * Its from the jbt/js-crypto package (https://github.com/jbt/js-crypto)
 *
 * LICENCE NOTE OF THE ORIGINAL AUTHOR:
 * These scripts are licensed under the ☺ licence, so basically you're free to use them however you please -
 * feel free to use or modify them in whatever way you like. You don't have to explicitly credit me
 * (but if you do then I won't complain), but just don't pass them off as entirely your own,
 * ok? That's just not cool.
 *
 * @param value
 * @return {string}
 */
export function md5(value: number | string): string
{
    let str: any = value + '';
    var b, c, d, j: any,
        x: any = [],
        str2 = unescape(encodeURI(str)),
        a: any = str2.length,
        h = [b = 1732584193, c = -271733879, ~b, ~c],
        i = 0;
    
    for (; i <= a;) {
        x[i >> 2] |= (str2.charCodeAt(i) || 128) << 8 * (i++ % 4);
    }
    
    x[str = (a + 8 >> 6) * 16 + 14] = a * 8;
    i = 0;
    
    // Kudos to the author, thsi is some crazy shit o.O
    for (; i < str; i += 16) {
        for (a = h, j = 0; j < 64;) {
            a = [
                d = a[3],
                (b = 0 | a[1]) + ((d = a[0] + [
                                      b & (c = a[2]) | ~b & d,
                                      d & b | ~d & c,
                                      b ^ c ^ d,
                                      c ^ (b | ~d)
                                  ][a = j >> 4] + (k[j] + (0 |
                                                           x[[j, 5 * j + 1, 3 * j + 5, 7 * j][a] % 16 + i]))) <<
                                  (a = [
                                      7,
                                      12,
                                      17,
                                      22,
                                      5,
                                      9,
                                      14,
                                      20,
                                      4,
                                      11,
                                      16,
                                      23,
                                      6,
                                      10,
                                      15,
                                      21
                                  ][4 * a + j++ % 4]) | d >>> 32 - a),
                b,
                c
            ];
        }
        for (j = 4; j;) {
            h[--j] = h[j] + a[j];
        }
    }
    
    str = '';
    for (; j < 32;) {
        str += ((h[j >> 3] >> ((1 ^ j++ & 7) * 4)) & 15).toString(16);
    }
    
    return str;
}