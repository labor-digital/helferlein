/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
/**
 * This helper can be used to convert a number value into a formatted money string.
 * The output format will be 1.000.000,00 or 1.000.000 if "dropDecimals" is set to true
 * @param value The value to convert into a number format
 * @param dropDecimals True to drop the decimal numbers in the output
 * @param thousandSeparator Set to FALSE to disable the thousand separators
 */
export declare function numberAsMoney(value: number, dropDecimals?: boolean, thousandSeparator?: boolean): string;
