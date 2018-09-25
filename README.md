# Helpers.js
Not mutch to document really.
Just a bunch of helper methods I use in a lot (all) of my projects and wanted
to put together into a single repository to keep track of changes.

## Helpers
### asArray(object): Array
Converts a given object literal, Set, Map or arrays into a new array instance and returns it.
Null and undefined will return an empty array.

### asObject(object): ObjectLiteral
Converts a given object literal, Set, Map or array into a new object instance and returns it.
It will keep all keys of objects, and maps and will use array/set indexes for keys as a fallback.
Null and undefined will return an empty object.

### md5(value): string
The smallest md5 hash implementation I found on the internets.
Its from the [jbt/js-crypto package](https://github.com/jbt/js-crypto).
It receives either a number or a string and returns an md5 hash.

### forEach(object, callback)
Loops over arrays or objects and applies a given callback with params: (value, key, iteratedObject)
Will work with Arrays, Objects, Map, Set and jQuery objects.
If jQuery is used the callback params are: ($jQueryValue, key, value, iteratedObject)

### map(object, callback)
Basically [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
but it works also for objects, Maps and Sets. Callback params: (value, key, iteratedObject)

### filter(object, callback)
Similar to [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
but it works also for objects, Maps and Sets. Callback params: (value, key, iteratedObject).
The callback should return TRUE if a value is KEPT, FALSE if it should be REMOVED.

### mergeRecursive(...args): mixed
Can be used to merge multiple objects into each other. It will merge the objects recursively,
so if your object looks like {a: {foo:'bar'}} and {a: {bar, 'baz'}} the result will be 
{a:{foo:'bar', bar: 'baz'}}.

For the cool part: It works also for Array's, Map's, Set's in any order. So you may merge
a Set with a Map, with an object and you may even nest objects, and Maps into each other. 
**Note When merging an object into an array or a Set, you will loose your keys!**

The first argument type will determine the output type. So, if you supply an object,
followed by an array, the output will be an object. 

### isMap(object): boolean
Returns true if the given object is of es6 type Map, false if not. 
Works also with core.js polyfills.

### isSet(object): boolean
Returns true if the given object is of es6 type Set, false if not. 
Works also with core.js polyfills.