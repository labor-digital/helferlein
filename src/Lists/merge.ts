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
 * Last modified: 2019.01.09 at 18:42
 */
import {asArray} from '../FormatAndConvert/asArray';
import {List} from '../Interfaces/List';
import {forEach} from './forEach';
import {getListType, getListValue, getNewList, ListType, setListValue} from './listAccess';

function _mergeInternal(output: List, list: List)
{
    
    // Speed up the handling of sets
    const outputType = getListType(output);
    const outputLookup = outputType === ListType.Set ? asArray(output) : output;
    
    // Handle the merging of values INTO arrays and sets
    if (outputType === ListType.Array || outputType === ListType.Set) {
        const comparator = (outputLookup as Array<any>).slice(0);
        forEach(list, value => {
            if (comparator.indexOf(value) !== -1) {
                return;
            }
            setListValue(output, value);
        });
        return;
    }
    
    forEach(list, (v, key) => {
        const outputV = getListValue(outputLookup, key);
        const outputVType = getListType(outputV);
        const vType = getListType(v);
        
        // Check if we can merge both values
        if (vType !== ListType.NoList && outputVType !== ListType.NoList) {
            // Merge the children
            _mergeInternal(outputV, v);
            v = outputV;
        }
        
        // Set the merged value inside the output list
        setListValue(output, v, key);
    });
}

/**
 * Can be used to merge multiple objects into each other. It will merge the objects recursively,
 * so if your object looks like {a: {foo:'bar'}} and {a: {bar, 'baz'}} the result will be
 * {a:{foo:'bar', bar: 'baz'}}.
 *
 * For the cool part: It works also for Array's, Map's, Set's in any order. So you may merge
 * a Set with a Map, with an object and you may even nest objects, and Maps into each other.
 *
 * Arrays will be merged and values will be deduped if they come from different lists.
 * Meaning: [1, 2, 3] + [1, 4, 6] = [1, 2, 3, 4, 6]
 * BUT: [1, 2, 3] + [1, 4, 4, 4, 6] = [1, 2, 3, 4, 4, 4, 6]
 *
 * Note When merging an object into an array or a Set, you will loose your keys!
 *
 * The first argument type will determine the output type. So, if you supply an object,
 * followed by an array, the output will be an object.
 *
 * @param args
 */
export function merge(...args): List
{
    // Check if there was enough input given
    if (args.length < 2) {
        throw new Error('There must be at least two lists to merge!');
    }
    
    // Prepare the output
    const type = getListType(args[0]);
    if (type === ListType.NoList) {
        throw new Error('Could not determine the output type of a given list!');
    }
    const output = getNewList(type);
    
    // Merge all given lists into the output
    forEach(args, list => {
        _mergeInternal(output, list)
    });
    
    // Done
    return output;
}