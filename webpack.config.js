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
 * Last modified: 2020.01.02 at 16:25
 */

const path = require('path');
const fs = require('fs');

// A list of module names that should be rewritten to something different
const rewrites = {
    'ui.BreakpointService.BreakpointService': 'ui.BreakpointService',
    'index': 'all'
};

// A list of compiled ts files that should not be converted into browser chunks
const forbiddenPatterns = [
    /[Ii]nterfaces?$/,
    /index\./,
    /interfaces\./,
    /_internals/,
    /breakpointService\./,
    /node\.?/
];

const basePath = path.join(__dirname, 'dist');

// Find all functions we have in our library...
const entryPoints = {};
const traverser = function (pathString) {
    fs.readdirSync(pathString).forEach(fileName => {
        const localPathString = path.join(pathString, fileName);
        const fStats = fs.statSync(localPathString);
        if (fStats.isDirectory()) {
            traverser(localPathString);
        } else {
            // Ignore node modules
            if (localPathString.match(/[\\\/]Node[\\\/]/)) {
                return;
            }
            
            if (localPathString.match(/\.([^.]+)$/, '')[1] === 'js') {
                let baseName = localPathString.replace(/\.([^.]+)$/, '');
                baseName = baseName.substr(basePath.length);
                baseName = baseName.replace(/[\/\\]/g, '.');
                if (baseName.charAt(0) === '.') {
                    baseName = baseName.substr(1);
                }
                baseName = baseName
                    .split('.')
                    .map(v => v.slice(0, 1).toLowerCase() + v.slice(1))
                    .join('.');
                
                if (typeof rewrites[baseName] === 'string') {
                    baseName = rewrites[baseName];
                }
                
                for (let i = 0; i < forbiddenPatterns.length; i++) {
                    const pattern = forbiddenPatterns[i];
                    if (baseName.match(pattern)) {
                        return;
                    }
                }
                
                entryPoints[baseName] = localPathString;
            }
        }
    });
};
traverser(basePath);

module.exports = {
    mode: 'production',
    target: 'es5',
    entry: entryPoints,
    output: {
        path: path.join(__dirname, 'dist.browser'),
        filename: 'Helferlein.[name].js',
        library: ['Helferlein'],
        libraryTarget: 'umd',
        chunkFormat: 'array-push'
    },
    performance: {
        hints: false
    }
};