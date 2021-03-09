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

This package is designed to run in a typescript application and not directly in the browser. A common usecase would look like:

```
import {asArray} from "@labor-digital/helferlein/lib/FormatAndConvert/asArray";
const objectAsArray = asArray({'a': 1, 'b': 2, 'd': 3, 'e': 'asdf'});
``` 

As you see in the import statement we did not add a "main" file to avoid overhead for bundlers that don't support treeshaking out of the box.

However, if you want to use the library in your browser, without typescript you can use the precompiled javascript files in the "lib.browser" directory. You can
simply import any file in your html and and access the helper functions using ``Helferlein.asArray()`` in your javascript.

## Documentation

The documentation / API can be found [here](http://helferlein.labor.tools/) but is also rendered at "./doc/index.html" for local usage

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning
which of our package(s) you are using.

Our address is: LABOR.digital - Fischtorplatz 21 - 55116 Mainz, Germany

We publish all received postcards on our [company website](https://labor.digital).