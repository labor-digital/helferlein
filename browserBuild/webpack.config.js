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

const path = require("path");
const fs = require("fs");

// Find all functions we have in our library...
const dir = "../lib/";
const entryPoints = {};
const traverser = function (pathString) {
	fs.readdirSync(pathString).forEach(fileName => {
		const localPathString = path.join(pathString, fileName);
		const fStats = fs.statSync(localPathString);
		if (fStats.isDirectory()) {
			traverser(localPathString);
		} else {
			if (localPathString.match(/\.([^.]+)$/, "")[1] === "js") {
				const baseName = path.basename(localPathString).replace(/\.([^.]+)$/, "");
				entryPoints[baseName] = localPathString;
			}
		}
	});
};
traverser(dir);

module.exports = {
	mode: "production",
	entry: entryPoints,
	output: {
		path: path.join(__dirname, "../lib.browser"),
		filename: "Helferlein.[name].js",
		library: ["Helferlein"],
		libraryTarget: "umd"
	},
	performance: {
		hints: false
	}
};