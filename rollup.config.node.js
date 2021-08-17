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
 * Last modified: 2021.03.09 at 13:49
 */

import copy from 'rollup-plugin-copy';
import pkg from './package.json';

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${pkg.name}
 * (c) ${pkg.author.name} (${pkg.author.email} | ${pkg.author.url})
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options)
{
    return {
        banner,
        name: 'helferlein.node',
        exports: 'named',
        sourcemap: true,
        ...options
    };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
    input: './dist/node.js',
    onwarn: function (warning) {
        // Suppress this error message...
        // https://github.com/rollup/rollup/issues/794#issuecomment-270803587
        if (warning.code === 'THIS_IS_UNDEFINED') {
            return;
        }
        console.error(warning.message);
    },
    output: [
        createOutputOptions({
            file: './node/dist/index.js',
            format: 'esm'
        }),
        createOutputOptions({
            file: './node/dist/index.cjs.js',
            format: 'cjs'
        })
    ],
    plugins: [
        copy({
            targets: [
                {src: './dist/node.d.ts', dest: './node/dist', rename: 'index.d.ts'},
                {src: './dist/Node/*.d.ts', dest: './node/dist/Node'},
                {src: './dist/Node/FileSystem/*.d.ts', dest: './node/dist/Node/FileSystem'}
            ]
        })
    ]
};

export default options;