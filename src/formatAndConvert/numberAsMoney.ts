/**
 * Created by Martin Neundorfer on 22.11.2018.
 * For LABOR.digital
 */
/**
 * This helper can be used to convert a number value into a formatted money string.
 * The output format will be 1.000.000,00 or 1.000.000 if "dropDecimals" is set to true
 * @param value The value to convert into a number format
 * @param dropDecimals True to drop the decimal numbers in the output
 */
export function numberAsMoney(value: number, dropDecimals?: boolean): string {
	if(typeof value === "string") value = parseFloat(value);
	if (typeof value !== "number" || isNaN(value)) return "ERR";
	// Make sure every browser has the correct base format
	let result = (Math.round(value * 100) / 100).toFixed(2);

	if (dropDecimals)
		return result.replace(/\..*?$/g, "").replace(/(\d)(?=(\d{3})+$)/g, "$1.");
	return result.replace(/\./g, ",").replace(/(\d)(?=(\d{3})+,)/g, "$1.");
}