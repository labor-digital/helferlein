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
 * Last modified: 2019.07.25 at 10:02
 */

import {List} from '../Interfaces/List';
import {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from '../Lists/forEach';
import {getListType, getListValue, ListType, setListValue} from '../Lists/listAccess';
import {merge} from '../Lists/merge';
import {isArray} from '../Types/isArray';
import {isFunction} from '../Types/isFunction';
import {isNumber} from '../Types/isNumber';
import {isNumeric} from '../Types/isNumeric';
import {isObject} from '../Types/isObject';
import {isPlainObject} from '../Types/isPlainObject';
import {isString} from '../Types/isString';
import {isUndefined} from '../Types/isUndefined';
import {
    MakeOptionsDefinition,
    MakeOptionsOptions,
    MakeOptionsValueDefinition,
    MakeOptionTypes
} from './makeOptions.interfaces';

// The list of allowed keys inside a definition object
const ALLOWED_DEFINITION_KEYS = ['default', 'validator', 'preFilter', 'filter', 'type', 'children', 'values'];

// The map of string types to the numeric equivalent
const LIST_TYPE_MAP = {
    boolean: 0,
    bool: 1,
    number: 2,
    numeric: 3,
    string: 4,
    array: 5,
    object: 6,
    plainObject: 7,
    plainobject: 7,
    true: 8,
    false: 9,
    callable: 10,
    undefined: 11,
    'null': 12
};

export class OptionApplier
{
    /**
     * The list of errors we encountered while applying the options
     */
    protected errors = [];
    
    /**
     * The options for the applier
     */
    protected options: MakeOptionsOptions | PlainObject;
    
    /**
     * If set, this holds the values that the custom validator returned
     * This is needed to transfer the values from the custom validator to the value validator.
     * The property is cleaned afterwards
     */
    protected customValidatorValues;
    
    /**
     * Can be used in the same way as makeOptions
     * @param input
     * @param definition
     * @param options
     *
     * @see makeOptions
     */
    public apply(input: List | any, definition: MakeOptionsDefinition, options?: MakeOptionsOptions): List | any
    {
        this.options = options || {};
        this.errors = [];
        const result = this.applyInternal(input, definition, []);
        if (this.errors.length > 0) {
            throw new Error('Errors while validating options: \r\n -' + this.errors.join('\r\n -'));
        }
        return result;
    }
    
    /**
     * Internal helper to apply the definition recursively including the children
     *
     * @param list
     * @param definition
     * @param path
     */
    protected applyInternal(list: List | any, definition: MakeOptionsDefinition, path: Array<string>): List | any
    {
        // Prepare the result list
        const listType = getListType(list);
        if (listType === ListType.NoList) {
            throw new Error('The given "list" is not a proper list object!');
        }
        const result = merge(list, {});
        path.push('');
        
        // Apply defaults
        forEach(definition, (def: MakeOptionsValueDefinition, k: string) => {
            // Prepare local path
            path.pop();
            path.push(k);
            
            // Validate the definition
            this.validateDefinition(def, path);
            
            // Check if we have work to do
            if (!isUndefined(getListValue(list, k))) {
                return;
            }
            
            // Apply the defaults
            this.applyDefaultsFor(result, k, def, path);
        });
        
        // Traverse the list
        forEach(result, (v, k: string) => {
            // Prepare local path
            path.pop();
            path.push(k);
            
            // Check if we know this key
            if (isUndefined(definition[k])) {
                // Ignore if we allow unknown
                if (this.options.allowUnknown === true) {
                    return;
                }
                // Handle the error
                this.errors.push(
                    'Invalid option key: "' + k + '" allowed keys are: ' + Object.keys(definition).join(', '));
                return;
            }
            const def = definition[k];
            
            // Apply the pre-filter
            v = this.applyPreFilter(k, v, def, path, result);
            
            // Check type-validation
            if (!this.checkTypeValidation(v, def, path)) {
                return;
            }
            
            // Apply the filter
            v = this.applyFilter(k, v, def, path, list);
            
            // Check custom validation
            if (!this.checkCustomValidation(k, v, def, path, result)) {
                return;
            }
            
            // Check value validation
            if (!this.checkValueValidation(v, def, path)) {
                return;
            }
            
            // Handle children
            if (isObject(v) && isObject(def.children)) {
                v = this.applyInternal(v, def.children, path);
            }
            
            // Add the value to the result
            setListValue(result, v, k);
        });
        
        // Done
        return result;
    }
    
    /**
     * Internal helper which is used to validate a given definition to make sure only valid keys are given
     * @param def
     * @param path
     */
    protected validateDefinition(def: MakeOptionsValueDefinition, path: Array<string>): void
    {
        // Check if there are invalid keys
        forEach(def, (v, k) => {
            if (ALLOWED_DEFINITION_KEYS.indexOf(k) === -1) {
                throw new Error(
                    'Error at: "' + path.join('.') + '" invalid key found: "' + k + '" allowed keys are: ' +
                    ALLOWED_DEFINITION_KEYS.join(', '));
            }
        });
    }
    
    /**
     * Is called to apply the default values for a missing key in the given $list
     *
     * @param list The list to add the default value to
     * @param k    The key to add the default value for
     * @param def  The definition to read the default value from
     * @param path The path for the error message or the callback
     */
    protected applyDefaultsFor(list: List, k: string, def: MakeOptionsValueDefinition, path: Array<string>): void
    {
        // Check if we got a default value
        if (isUndefined(def.default)) {
            if (!isUndefined(def.type) && (isString(def.type) && def.type === 'undefined' || isArray(def.type) &&
                                           def.type.indexOf('undefined') !== -1)) {
                return;
            }
            this.errors.push('The option key: "' + path.join('.') + '" is required!');
            return;
        }
        
        // Apply the value
        const val = isFunction(def.default) ? def.default(k, list, def, path) : def.default;
        setListValue(list, val, k);
    }
    
    /**
     * Internal helper to apply the given pre-filter callback
     *
     * @param k    The key of the value to filter for the callback
     * @param v    The value to filter
     * @param def  The definition of the value to filter
     * @param path The path of the value for the callback
     * @param list The whole list for the callback
     */
    protected applyPreFilter(k: string, v: any, def: MakeOptionsValueDefinition, path: Array<string>, list: List): any
    {
        if (!isFunction(def.preFilter)) {
            return v;
        }
        return def.preFilter(v, k, list, def, path);
    }
    
    /**
     * Internal helper to check the "type" validation of the definition
     *
     * @param v    The value to validate
     * @param def  The definition to validate with
     * @param path The path of the value for the error message
     */
    protected checkTypeValidation(v: any, def: MakeOptionsValueDefinition, path: Array<string>): boolean
    {
        // Skip, if there is no validation required
        if (isUndefined(def.type)) {
            return true;
        }
        
        // Resolve shorthand
        let types = def.type;
        if (isString(types)) {
            types = [types as MakeOptionTypes];
        }
        
        // Validate input
        if (!isArray(types)) {
            throw new Error(
                'Error at "' + path.join('.') + '" - The type definition has to be an array or a string');
        }
        
        // Build internal list
        const typeList: Set<number> = new Set();
        forEach(types as Array<MakeOptionTypes>, (type: string) => {
            type = type.toLowerCase().trim();
            if (!isUndefined(LIST_TYPE_MAP[type])) {
                typeList.add(LIST_TYPE_MAP[type]);
            } else {
                throw new Error('Error at "' + path.join('.') + '" - Invalid type: "' + type + '" given! Only ' +
                                Object.keys(LIST_TYPE_MAP).join(', ') + ' are allowed!');
            }
        });
        
        // Validate the value
        if (!this.validateTypesOf(v, typeList)) {
            this.errors.push(
                'Invalid value type (' + typeof v + ') at: "' + path.join('.') + '"; Allowed types are: ' +
                (types as Array<string>).join(', '));
            return false;
        }
        return true;
    }
    
    /**
     * Internal helper to apply the given filter callback
     *
     * @param k    The key of the value to filter for the callback
     * @param v    The value to filter
     * @param def  The definition of the value to filter
     * @param path The path of the value for the callback
     * @param list The whole list for the callback
     */
    protected applyFilter(k: string, v: any, def: MakeOptionsValueDefinition, path: Array<string>, list: List): any
    {
        if (!isFunction(def.filter)) {
            return v;
        }
        return def.filter(v, k, list, def, path);
    }
    
    /**
     * Internal helper to apply the given, custom validation for a given value
     *
     * @param k    The key of the value to validate for the callback
     * @param v    The value to validate
     * @param def  The definition to validate with
     * @param path The path of the value for the error message
     * @param list The whole list for the callback
     */
    protected checkCustomValidation(
        k: string,
        v: any,
        def: MakeOptionsValueDefinition,
        path: Array<string>,
        list: List
    ): boolean
    {
        // Skip, if there is no validation required
        if (!isFunction(def.validator)) {
            return true;
        }
        
        // Call the validator
        const validatorResult = def.validator(v, k, list, def, path);
        if (validatorResult === true) {
            return true;
        }
        
        // Store possible values the validator might have returned
        if (isArray(validatorResult)) {
            this.customValidatorValues = validatorResult;
            return true;
        }
        
        // Create error message
        this.errors.push(validatorResult === false ? 'Invalid option: "' + path.join('.') + '" given!'
            : 'Validation failed at: "' + path.join('.') + '" - ' + validatorResult);
        return false;
    }
    
    /**
     * Internal helper to check the "value" validation of the definition
     *
     * @param v    The value to validate
     * @param def  The definition to validate with
     * @param path The path of the value for the error message
     */
    protected checkValueValidation(v: any, def: MakeOptionsValueDefinition, path: Array<string>): boolean
    {
        let values = def.values;
        if (!isArray(values)) {
            if (!isArray(this.customValidatorValues)) {
                return true;
            }
            values = this.customValidatorValues;
            this.customValidatorValues = undefined;
        }
        
        // Check if the value is in the list
        if (values.indexOf(v) !== -1) {
            return true;
        }
        
        // Fail
        this.errors.push(
            'Validation failed at: "' + path.join('.') + '"; The given value is not in the list of possible values!');
        return false;
    }
    
    /**
     * Internal helper which validates the type of a given value against a list of valid types
     *
     * @param v the value to validate
     * @param types The list of types to validate $value against
     */
    protected validateTypesOf(v: any, types: Set<number>): boolean
    {
        let valid = false;
        forEach(types, (type: number) => {
            switch (type) {
                case LIST_TYPE_MAP.number:
                    if (isNumber(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.numeric:
                    if (isNumeric(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.string:
                    if (typeof v === 'string') {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.array:
                    if (isArray(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.object:
                    if (isObject(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.plainObject:
                case LIST_TYPE_MAP.plainobject:
                    if (isPlainObject(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.undefined:
                    if (isUndefined(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.callable:
                    if (isFunction(v)) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.bool:
                case LIST_TYPE_MAP.boolean:
                    if (typeof v === 'boolean') {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.true:
                    if (v === true) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.false:
                    if (v === false) {
                        valid = true;
                    }
                    break;
                case LIST_TYPE_MAP.null:
                    if (v === null) {
                        valid = true;
                    }
                    break;
            }
            if (valid === true) {
                return false;
            }
        });
        return valid;
    }
}

/**
 * This nifty little helper is used to apply a default definition of options
 * to a given object of options (presumably transferred as a function parameter)
 *
 * An Example:
 * function myFunc(value, options){
 *    const definition = {
 *        foo: {
 *            default: 123
 *        },
 *        bar: {
 *            default: null
 *        }
 *    }
 *    options = makeOptions(options, definition);
 *    ...
 * }
 *
 * myFunc("something") => options will be {foo: 123, bar: null}
 * myFunc("something", {foo: 234}) => $options will be {foo: 234, bar: null}
 * myFunc("something", {rumpel: 234}) => This will cause an error, because the key is not known
 * myfunc("something", {foo: "rumpel"}) $options will be {foo: "rumpel", bar: null}
 *
 * IMPORTANT NOTE: When you want to set an array as default value make sure to wrap it in a function
 * Example: $defaults = {rumpel: {default: {}}}} <- Don't do this! Do this: {rumpel: {default: () => {return {}; }}}
 *
 * Advanced definitions
 * =============================
 * In addition to the simple default values you can also use an array as value in your definitions array.
 * In it you can set the following options to validate and filter options as you wish.
 *
 * - default (mixed|callable): This is the default value to use when the key in $options is empty.
 * If not set the option key is required! If the default value is a Closure the closure is called
 * and it's result is used as value.
 * The callback receives $key, $options, $definition, $path(For child arrays)
 *
 * - type (string|array): Allows basic type validation of the input. Can either be a string or an array of strings.
 * Possible values are: boolean, bool, true, false, number (int and float) or numeric (both int and float +
 * string numbers), string, null, callable object and plainObject.
 * If multiple values are supplied they will be seen as chained via OR operator.
 *
 * - preFilter (callable): A callback which is called BEFORE the type validation takes place and can be used to
 * cast the incoming value before validating it's type.
 *
 * - filter (callable): A callback which is called after the type validation took place and can be used to process
 * a given value before the custom validation begins.
 * The callback receives $value, $key, $options, $definition, $path(For child arrays)
 *
 * - validator (callable): A callback which allows custom validation using closures or other callables. If used the
 * function should return true if the validation was successful or false if not. It is also possible to return a
 * string which allows you to set your own error message. In addition you may return an array of values that will
 * be passed to the "values" validator (see the next point for the functionality)
 * The callback receives $value, $key, $options, $definition, $path(For child arrays)
 *
 * - values (array): A basic validation routine which receives a list of possible values and will check if
 * the given value will match at least one of them (OR operator). The array can either be set statically
 * in your definition, or by using a "validator" callback that returns an array of possible values.
 * The values validation takes place after the "validator" callback ran.
 *
 * - children (object): This can be used to apply nested definitions on option trees.
 * The children definition is done exactly the same way as on root level.
 * NOTE: The children will only be used if the value in $options is an array
 * (or has a default value of an empty array)
 *
 * @param input
 * @param definition
 * @param options Additional options
 */
export function makeOptions(
    input: List | any,
    definition: MakeOptionsDefinition,
    options?: MakeOptionsOptions
): List | any
{
    const applier = new OptionApplier();
    return applier.apply(input, definition, options);
}

export default makeOptions;