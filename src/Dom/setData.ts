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
 * Last modified: 2019.07.24 at 17:27
 */

import {PlainObject} from "../Interfaces/PlainObject";
import {inflectToDashed} from "../Strings/Inflector/inflectToDashed";
import {isNull} from "../Types/isNull";
import {isNumber} from "../Types/isNumber";
import {isString} from "../Types/isString";
import {setAttr} from "./setAttr";

/**
 * Can be used to set a HTML data- attribute to a certain element.
 *
 * Note: This is not jQuery! This will really set the attribute, no magical in-memory data here!
 *
 * @param element The element to set the data to
 * @param selector The name of the data attribute to set the value (data-)some-attribute. (The data- part is optional)
 * @param data The value to be set as data. Complex data will be json encoded. If NULL is given the data attribute will be removed
 */
export function setData(element: HTMLElement, selector: string, data: string | number | Array<any> | PlainObject | null) {
	
	// Prepare the data
	if (!isNull(data) && !isString(data) && !isNumber(data)) data = JSON.stringify(data);
	
	// Prepare the selector name
	const attributeName = "data-" + inflectToDashed(selector.trim()).replace(/^data-/, "");
	
	// Update the element
	setAttr(element, attributeName, data as string | number | null);
}