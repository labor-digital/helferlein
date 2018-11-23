/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
/**
 * Converts a given money format like 2.000.000,00 or 3,000,000.00 or 3.000.000 into regular javascript numbers
 * @param value
 */
export function moneyAsNumber(value) {
    if (typeof value === "number")
        value = value + "";
    if (typeof value !== "string")
        return -1;
    // Try to gather the comma character
    let comma = value.replace(/[^0-9,.]/g, "").substr(-3).replace(/[^.,]/g, "");
    let hasComma = comma.length !== 0;
    // Try to find comma in numbers like 98000.00000000003
    if (!hasComma) {
        comma = value.replace(/[^\.\,]/g, '').trim();
        // The last char is our comma sign
        if (comma.length > 0) {
            comma = comma.charAt(comma.length - 1);
            hasComma = true;
        }
    }
    comma = hasComma ? comma : ",";
    // Clean up the input
    var commaPosition = value.split("").reverse().join("").indexOf(comma);
    var decimal = hasComma ? value.substr(-commaPosition) : "00";
    value = hasComma ? value.substr(0, value.length - (commaPosition)) : value;
    value = value.replace(/[^0-9]/g, "");
    // Done
    return parseFloat(value + "." + decimal);
}
