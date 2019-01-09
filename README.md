# Helferlein (Little Helper)
This package is the successor of helpers.js and contains a number of helper functions and their typescript definitions. In contrast to the original helpers.js this package is not dependend on jquery.

All helpers should now also be able to run in a node.js context without an issue. 

## General
### $globj
This is a static class that is designed to access jQuery objects you will
need multiple times for sure. Document, Body, Html and so on are only selected
once and than held in storage to save processing time.

### checkOnlineState(): Promise
Checks if the script can currently call the internet or not. 
The promise value is either TRUE for "there is internet", or FALSE if there is no connection.

### Interfaces
Holds some helpfull Typescript interfaces like a generic Object or 
a shortcut for jQuery events

### md5(value): string
The smallest md5 hash implementation I found on the internets.
Its from the [jbt/js-crypto package](https://github.com/jbt/js-crypto).
It receives either a number or a string and returns an md5 hash.

### merge(...args):Array|GenericObject|false
This is the lightwight brother of mergeRecursive.
It will only merge arrays and generic objects. It will also only merge
elements with the same type, meaning objects with objects and arrays with arrays.
If an error occured the method will return false
 
### mergeRecursive(...args): mixed
Can be used to merge multiple objects into each other. It will merge the objects recursively,
so if your object looks like {a: {foo:'bar'}} and {a: {bar, 'baz'}} the result will be 
{a:{foo:'bar', bar: 'baz'}}.

For the cool part: It works also for Array's, Map's, Set's in any order. So you may merge
a Set with a Map, with an object and you may even nest objects, and Maps into each other. 
**Note When merging an object into an array or a Set, you will loose your keys!**

The first argument type will determine the output type. So, if you supply an object,
followed by an array, the output will be an object. 

## Format and Convert

### asArray(object): Array
Converts a given object literal, Set, Map or arrays into a new array instance and returns it.
Null and undefined will return an empty array.

### asObject(object): ObjectLiteral
Converts a given object literal, Set, Map or array into a new object instance and returns it.
It will keep all keys of objects, and maps and will use array/set indexes for keys as a fallback.
Null and undefined will return an empty object.

### moneyAsNumber(value):number
Converts a given money format like 2.000.000,00 or 3,000,000.00 or 3.000.000 into regular javascript numbers

### numberAsMoney(value, dropDecimals):string
This helper can be used to convert a number value into a formatted money string.
The output format will be 1.000.000,00 or 1.000.000 if "dropDecimals" is set to true

### numberAsPercent(value, dropDecimals):string
Converts a given, numeric value 0.45 and converts it into a percent representation like 45,00
or 45 if dropDecimals is set to true

### percentAsNumber(value):number
Converts a given value like 1,4 or 12.60 into their numeric representation as float: 0.014 and 0.1260

## Iteration

### filter(object, callback)
Similar to [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
but it works also for objects, Maps and Sets. Callback params: (value, key, iteratedObject).
The callback should return TRUE if a value is KEPT, FALSE if it should be REMOVED.

### forEach(object, callback)
Loops over arrays or objects and applies a given callback with params: (value, key, iteratedObject)
Will work with Arrays, Objects, Map, Set and jQuery objects.
If jQuery is used the callback params are: ($jQueryValue, key, value, iteratedObject)

### map(object, callback)
Basically [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
but it works also for objects, Maps and Sets. Callback params: (value, key, iteratedObject)

### reduce(value, callback, initial)
Helper to appliy a function against an accumulator and each element in the list to reduce it to a single value.
Will work with Arrays, Objects, Map, Set

## Strings

### sanitizeString(string): string
Removes all non alpha numerical chars from the given string and returns it.
Also keeps - _ and /

### ucFirst(string): string
Receives a string, trims it and sets the first char to uppercase

## Types

### isArray(value): boolean
Returns true if the given value is an array, false if not

### isEmpty(value): boolean
Returns true if the given value counts as empty
Empty values are: NULL, undefined, 0, "", " ", {}, [] and empty Maps and Sets

### isMap(object): boolean
Returns true if the given object is of es6 type Map, false if not. 
Works also with core.js polyfills.

### isNumber(value): boolean
Returns true if the given value is a number, false if not

### isSet(object): boolean
Returns true if the given object is of es6 type Set, false if not. 
Works also with core.js polyfills.

### isString(value): boolean
Returns true if the given value is a string, false if not

### isUndefined(value): boolean
Returns true if the given value is undefined, false if not


