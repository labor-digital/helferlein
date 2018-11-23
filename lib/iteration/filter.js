/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */
import IterableHelpers from "./IterableHelpers";
import { forEach } from "./forEach";
export function filter(object, callback) {
    let outputType = IterableHelpers.getElementType(object);
    if (outputType === null)
        throw new Error("Could not determine the output type of a given element!");
    let output = IterableHelpers.getNewElement(outputType);
    forEach(object, (v, k) => {
        if (callback(v, k, object) === false)
            return;
        IterableHelpers.genericSet(outputType, output, k, v, false);
    });
    return output;
}
