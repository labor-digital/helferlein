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
 * Last modified: 2019.01.09 at 11:18
 */
import {moneyAsNumber} from "./moneyAsNumber";

/**
 * Converts a given value like 1,4 or 12.60 into their numeric representation as float: 0.014 and 0.1260
 * @param value
 */
export function percentAsNumber(value:string|number):number {
	const num = moneyAsNumber(value);
	return Math.abs(num) / 100;
}