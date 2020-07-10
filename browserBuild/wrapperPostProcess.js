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
 * Last modified: 2020.01.06 at 12:58
 */

const fs = require('fs');
const path = require('path');

/**
 * This small helper is used to inject a wrapper at the top of each browser library file.
 * This makes sure that multiple files can be loaded without overwriting each other
 */
const libPath = path.join(__dirname, '/../lib.browser');
fs.readdirSync(libPath).forEach(filename => {
    const filePath = path.join(libPath, filename);
    let content = fs.readFileSync(filePath).toString('utf-8');
    const moduleName = filename.replace(/Helferlein\./, '').replace(/\.js$/, '');
    const wrapper = 'var __hWrap=function(module){var all=(typeof Helferlein !== "undefined"?Helferlein:{});if (typeof module["' +
                    moduleName +
                    '"] !== "undefined") all["' + moduleName + '"]=module["' + moduleName + '"];return all;};';
    content = wrapper + '\r\n' + content.replace(/=t\(\)/g, '=__hWrap(t())');
    fs.writeFileSync(filePath, content);
    console.log('Injected wrapper for module: "' + moduleName + '" into ' + filePath);
});
