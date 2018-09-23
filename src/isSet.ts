// @todo test if this works with core-js polyfills
export function isSet(object: any): boolean{
	if(typeof object === 'undefined' || object === null) return false;
	return object instanceof Set || object.constructor === 'Set';
}