/**
 * Created by Martin Neundorfer on 17.10.2018.
 * For LABOR.digital
 */
export class Breakpoint {

	/**
	 * A counting number for this breakpoint
	 */
	id:number;

	/**
	 * The string name of the breakpoint "sm", "lg",...
	 */
	key: string;

	/**
	 * The minimum window width in pixels for this breakpoint
	 */
	min: number;

	/**
	 * The maximum window width in pixels for this breakpoint
	 */
	max: number;

	constructor(id:number, key: string, min: number, max: number) {
		this.id = id;
		this.key = key;
		this.min = min;
		this.max = max;
	}
}