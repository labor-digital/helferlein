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
 * Last modified: 2020.07.10 at 12:38
 */
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

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
 * This small helper is used to inject a wrapper at the top of each browser library file.
 * This makes sure that multiple files can be loaded without overwriting each other
 */
const libPath = path.join(process.cwd(), '/dist.browser');
fs.readdirSync(libPath).forEach(filename => {
    const filePath = path.join(libPath, filename);
    let content = fs.readFileSync(filePath).toString('utf-8');
    const moduleName = filename.replace(/Helferlein\./, '').replace(/\.js$/, '');
    const moduleNameParts = moduleName.split('.');
    const moduleBaseName = moduleNameParts[moduleNameParts.length - 1];
    const wrapper = 'var __hWrap=function(module){' +
                    'var all=(typeof Helferlein !== "undefined"?Helferlein:{});' +
                    'if (typeof module["' + moduleBaseName + '"] !== "undefined"){' +
                    'all["' + moduleBaseName + '"]=module["' + moduleBaseName + '"];' +
                    '}' +
                    'return all;};';
    content = banner + wrapper + '\r\n' + content.replace(/=t\(\)/g, '=__hWrap(t())');
    fs.writeFileSync(filePath, content);
});
