import { forEach } from "./iteration/forEach";
import IterableHelpers from "./iteration/IterableHelpers";
function mergeInternal(outputType, output, element) {
    forEach(element, (v, k) => {
        let vType = IterableHelpers.getElementType(v);
        let a = vType === null ? null : IterableHelpers.genericGet(outputType, output, k);
        let aType = vType === null ? null : IterableHelpers.getElementType(a);
        // Check if both values can be merged
        if (aType !== null && vType !== null) {
            v = mergeInternal(aType, a, v);
        }
        output = IterableHelpers.genericSet(outputType, output, k, v);
    });
    return output;
}
export function mergeRecursive(...args) {
    // Check if there was anything given
    if (args.length < 2)
        throw new Error('There sould be at least 2 arguments!');
    // Find output type
    let outputType = IterableHelpers.getElementType(args[0]);
    if (outputType === null)
        throw new Error('Could not determine the output type of a given element!');
    let output = IterableHelpers.getNewElement(outputType);
    // Loop trough all elements
    for (var i = 0; i < args.length; i++) {
        let element = args[i];
        output = mergeInternal(outputType, output, element);
    }
    return output;
}
