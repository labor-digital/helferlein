/**
 * Created by Martin Neundorfer on 01.02.2019.
 * For LABOR.digital
 */
import {isArray} from "../Types/isArray";
import {isPlainObject} from "../Types/isPlainObject";
import {PlainObject} from "../Interfaces/PlainObject";

/**
 * Can be used to sort arrays containing objects by a property of said objects
 * Can also be used to sort plain objects, containing other objects in the same way
 *
 * @param list the list to sort
 * @param by The property of the child objects to sort by
 */
export function sort(list: Array<PlainObject | any> | PlainObject, by: string | number) {
	// Sort array lists
	if (isArray(list)) {
		return list.sort(function (a, b) {
			var x = a[by];
			var y = b[by];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	// Sort plain objects
	if (isPlainObject(list)) {
		// Create sortable array out of given object
		const sorter = Object.keys(list).reduce((a, v) => {
			a.push({by: list[v][by], key: v, v: list[v]});
			return a;
		}, []);

		// Sort the array and rebuild the object out of it
		return (sort(sorter, "by") as Array<PlainObject>)
			.reduce((a, v) => {
				a[v.key] = v.v;
				return a;
			}, {});
	}
}