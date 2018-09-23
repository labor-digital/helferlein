import { isSet } from "./isSet";
import { isMap } from "./isMap";
import { forEach } from "./forEach";
function getTypeOfElement(element) {
    if (Array.isArray(element)) {
        return 'array';
    }
    else if (isSet(element)) {
        return 'set';
    }
    else if (isMap(element)) {
        return 'map';
    }
    else if (typeof element === 'object' && element !== null) {
        return 'object';
    }
    return null;
}
function getNewOutputElement(outputType) {
    switch (outputType) {
        case 'array':
            return [];
        case 'set':
            return new Set();
        case 'map':
            return new Map();
        case 'object':
            return {};
    }
}
function genericGet(type, list, key) {
    switch (type) {
        case 'array':
            return list[key];
        case 'set':
            let out = undefined;
            forEach(list, (v, k) => {
                if (k !== key)
                    return;
                out = v;
                return false;
            });
            return out;
        case 'map':
            return list.get(key);
        case 'object':
            return list[key + ''];
    }
}
function genericSet(outputType, output, key, value) {
    switch (outputType) {
        case 'array':
            // Don't duplicate array entries
            if (output.indexOf(value) !== -1)
                return output;
            output.push(value);
            return output;
        case 'set':
            output.add(value);
            return output;
        case 'map':
            output.set(key, value);
            return output;
        case 'object':
            output[key] = value;
            return output;
    }
}
function mergeInternal(outputType, output, element) {
    forEach(element, (v, k) => {
        let vType = getTypeOfElement(v);
        let a = vType === null ? null : genericGet(outputType, output, k);
        let aType = vType === null ? null : getTypeOfElement(a);
        // Check if both values can be merged
        if (aType !== null && vType !== null) {
            v = mergeInternal(aType, a, v);
        }
        output = genericSet(outputType, output, k, v);
    });
    return output;
}
export function mergeRecursive(...args) {
    // Check if there was anything given
    if (args.length < 2)
        throw new Error('There sould be at least 2 arguments!');
    // Find output type
    let outputType = getTypeOfElement(args[0]);
    if (outputType === null)
        throw new Error('Could not determine the output type of a given element!');
    let output = getNewOutputElement(outputType);
    // Loop trough all elements
    for (var i = 0; i < args.length; i++) {
        let element = args[i];
        output = mergeInternal(outputType, output, element);
    }
    return output;
}
