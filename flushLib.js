/**
 * Created by Martin Neundorfer on 09.01.2019.
 * For LABOR.digital
 */
const fs = require("fs");
const path = require("path");
function rmdirRecursive(dirname, removeSelf) {
	if (fs.existsSync(dirname)) {
		fs.readdirSync(dirname).forEach(function (file, index) {
			var curPath = dirname + path.sep + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				rmdirRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		if (removeSelf !== false) fs.rmdirSync(dirname);
	}
}
rmdirRecursive(__dirname + "/lib", false);