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
/**
 * Removes all non alpha numerical chars from the given string and returns it.
 * Also keeps - _ and /
 * @param string
 */
export function sanitizeString(string:string):string {
	if(typeof string !== "string") return "";
	return string.replace(/[^a-zA-Z\-_/0-9]/g, "");
}