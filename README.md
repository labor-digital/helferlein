# LABOR - Helferlein

_"Helferlein" is german and means: Small Helper_

This javascript package contains a number of helper functions and their typescript definitions. Not all implementations are written by us; all external,
included code is annotated with it's source.

All helpers should be able to run in a node.js context, as well as in the browser and even a SSR context without any issues.

## Installation

Install this package using npm:

```
npm install @labor-digital/helferlein
```

## Usage

### In a module environment (webpack/typescript)

The helpers are distributed as loosely coupled components, that are tree-shakable by modern building tools like webpack. So you can simply load what you need
directly from your code

```js
import {asArray} from "@labor-digital/helferlein";

const objectAsArray = asArray({'a': 1, 'b': 2, 'd': 3, 'e': 'asdf'});
``` 

### As scrip in a browser

You can also load the pre-build sources directly in your browser. You don't need any bundler for that, just look inside the dist.browser directory.

#### Load only some helpers

Each helper is available in a standalone file. That way you can load either a single helper, or two, or three. Each loaded helper, will be added to the global "
Helferlein" object.

```html

<script type="text/javascript" src="../dist.browser/Helferlein.types.isArray.js"></script>
<script type="text/javascript" src="../dist.browser/Helferlein.types.isString.js"></script>
<script type="text/javascript">
    console.log('Is string', Helferlein.isString('true'), '<- true | false ->', Helferlein.isString(false));
    console.log('Is array', Helferlein.isArray([]), '<- true | false ->', Helferlein.isString(false));
</script>
```

#### Load all helpers

Alternatively you can load all available helpers at once using the "Helferlein.all.js" file.

```html

<script type="text/javascript" src="../dist.browser/Helferlein.all.js"></script>
<script type="text/javascript">
    console.log('Is string', Helferlein.isString('true'), '<- true | false ->', Helferlein.isString(false));
    console.log('Is array', Helferlein.isArray([]), '<- true | false ->', Helferlein.isString(false));
</script>
```

## Documentation

The documentation / API can be found [here](http://helferlein.labor.tools/) but is also rendered at "./doc/index.html" for local usage

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning
which of our package(s) you are using.

Our address is: LABOR.digital - Fischtorplatz 21 - 55116 Mainz, Germany

We publish all received postcards on our [company website](https://labor.digital).