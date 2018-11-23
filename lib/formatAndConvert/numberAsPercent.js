/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
import { numberAsMoney } from "./numberAsMoney";
/**
 * Converts a given, numeric value 0.45 and converts it into a percent representation like 45,00
 * or 45 if dropDecimals is set to true
 * @param value
 * @param dropDecimals
 */
export function numberAsPercent(value, dropDecimals) {
    if (typeof value === "string")
        value = parseFloat(value);
    value = (Math.round(value * 10000) / 100);
    return numberAsMoney(value, dropDecimals);
}
