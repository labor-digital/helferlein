# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.9.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.9.1%0Dv3.9.0#diff) (2019-08-07)


### Bug Fixes

* fix iterator problems in internet explorer 11 ([cd9fa97](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/cd9fa97))



# [3.9.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.9.0%0Dv3.8.1#diff) (2019-08-01)


### Features

* **getBackgroundColor:** add new helper to extract the background color of an element or its parents ([8ad69b8](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/8ad69b8))



## [3.8.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.8.1%0Dv3.8.0#diff) (2019-08-01)


### Bug Fixes

* **stopBodyScrolling:** disable html blocking by default and make it configurable ([e16b001](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/e16b001))



# [3.8.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.8.0%0Dv3.7.0#diff) (2019-08-01)


### Bug Fixes

* **setAttr:** fix overlap when multiple elements were given ([61af387](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/61af387))


### Features

* **getGuid:** make sure the guid is unique across multiple instances of this library ([ed6a957](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/ed6a957))
* **makeOptions:** add makeOptions helper to validate complex objects with ease ([a9d4ef6](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/a9d4ef6))
* **setData:** add helper to set data attributes on a dom element ([827e887](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/827e887))
* **stopBodyScrolling:** make the scroll blocking more reliable across multiple browsers ([3548780](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/3548780))



# [3.7.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.7.0%0Dv3.6.3#diff) (2019-07-26)


### Features

* add new isNumeric helper + test ([f98d16b](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/f98d16b))



## [3.6.3](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.6.3%0Dv3.6.2#diff) (2019-07-23)


### Bug Fixes

* **ScrollToTopOf:** fix broken element lookup ([bc2e4e9](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/bc2e4e9))



## [3.6.2](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.6.2%0Dv3.6.1#diff) (2019-07-23)


### Bug Fixes

* **ScrollToTopOf:** fix broken container lookup ([9a34f52](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/9a34f52))



## [3.6.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.6.1%0Dv3.6.0#diff) (2019-07-23)


### Bug Fixes

* **ScrollToTopOf:** apply options even if no target is given ([010398b](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/010398b))



# [3.6.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.6.0%0Dv3.5.1#diff) (2019-07-22)


### Features

* **BreakpointService:** add inTemplateSelector to config + getForWidth() method to calculate the breakpoint of a given width ([c8660ce](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/c8660ce))



## [3.5.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.5.1%0Dv3.5.0#diff) (2019-07-22)


### Bug Fixes

* rename hasPathWalker to getPathWalker ([f6bdb8a](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/f6bdb8a))



# [3.5.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.5.0%0Dv3.4.0#diff) (2019-07-03)


### Features

* add htmlEncode helper to html encode a string in a browser environment ([d453745](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/d453745))
* sort() now supports lookups by path as well as reversed ordering ([ff2038a](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/ff2038a))



# [3.4.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.4.0%0Dv3.3.0#diff) (2019-07-01)


### Bug Fixes

* **getListType:** return the correct list type for plain objects instead of "no-list" ([3508642](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/3508642))
* **getSimilarity test:** fix broken test assertion ([a31ac41](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/a31ac41))


### Features

* add getSimilarity() to calculate the similarity between two strings ([9ee3a3b](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/9ee3a3b))
* add hasClass() to check if a certain element has a css class or not ([204e3ea](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/204e3ea))
* getScrollPos() can now also return the horizontal scroll pos not only the vertical ([fe9bc41](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/fe9bc41))
* isElementInViewport can not also check if the queried element is COMPLETELY visible in the viewport. ([7c57f41](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/7c57f41))



# [3.3.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.3.0%0Dv3.2.1#diff) (2019-06-12)


### Features

* add escapeRegex helper as equivalent to PHP's preg_escape ([6dd6d17](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/6dd6d17))
* add isIterator helper ([8ada1f2](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/8ada1f2))
* **forEach:** add support for iterators in forEach loops ([f70d252](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/f70d252))
* **listAccess:** add support for iterators and add getListKeys helper ([b572b47](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/b572b47))
* add multiple path based list access helpers, ported from PHP and the matching tests ([97514c3](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/97514c3))



## [3.2.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.2.1%0Dv3.2.0#diff) (2019-05-17)


### Bug Fixes

* **rgbContrastColor:** better color calculation inside of rgbContrastColor ([862b8a3](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/862b8a3))



# [3.2.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.2.0%0Dv3.1.0#diff) (2019-05-17)


### Features

* add a bunch of helpers for calculating and converting colors ([bd10f49](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/bd10f49))



# [3.1.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.1.0%0Dv3.0.1#diff) (2019-05-17)


### Bug Fixes

* **ComponentProxy:** fix wrong function check when removing element event bindings ([8c7f0d8](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/8c7f0d8))


### Features

* **ajax:** Add X-Requested-With: XMLHttpRequest header to ajax calls to detect them on server side ([3ef1f19](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/3ef1f19))
* add getSize helper to get the size in pixels of a single element ([53d66da](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/53d66da))
* add helpers to manipulate dom element attributes ([2aec48c](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/2aec48c))
* allow all dom class manipulation functions to work with node-sets as well as HTMLElements ([677b2c9](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/677b2c9))



## [3.0.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.0.1%0Dv3.0.0#diff) (2019-04-04)


### Bug Fixes

* Make genericStorage usable with componentProxy's bind and unbind methods ([f799503](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/f799503))



# [3.0.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.0.0%0Dv2.1.1#diff) (2019-04-02)


### Bug Fixes

* fix references to EventBus in internal modules ([18656f0](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/18656f0))


### Features

* add isElementInViewport helper which checks if a given html element is (at least partly) visible in the current viewport ([ea6ba65](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/ea6ba65))
* make GenericStorage properties watchable via callbacks ([6c7a0e6](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/6c7a0e6))
* new eventhandling for eventbus ([6104cdd](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/6104cdd))


### BREAKING CHANGES

* The eventbus, component proxy and the event
registration functions have been moved to a new location



## [2.1.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v2.1.1%0Dv2.1.0#diff) (2019-03-18)



# [2.1.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v2.1.0%0Dv2.0.9#diff) (2019-03-18)


### Features

* Update dependencies to match node 11.11 ([012a341](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/012a341))



## [2.0.9] - 2019-02-21
### Added
- Added ComponentProxy class
- Added EventBus marker to provide ComponentProxy compatibility

### Changed
- Changed checkOnlineState timeout to 1000ms instead of 300ms
- Changed checkOnlineState cache time from 10 minutes to 30 seconds

## [2.0.8] - 2019-02-19
### Added
- Added inflector functions
- Added new test for inflectors
- Added lcFirst helper
- Added new licence
- Added phpstorm config
- Added toggleClass helper

### Changed
- BREAKING: renamed transistClass() options to more speaking names

## [2.0.7] - 2019-02-06
### Added
- Reimplemented checkOnlineState() now without dependency on jquery

### Fixed
- Fixed an issue with formatDateAndTime where the week day was one day off o.O
- Fixed getData() to no longer validate { or [ as first char before reading json contents
- Fixed an issue with ajax() which occured when request.data was empty

## [2.0.6] - 2019-02-01
### Added
- Added isBool() helper
- Added sort() helper to sort lists of objects by a property
- Added transistClass() helper to create smooth css transitions
- Added stickyElement() to create sticky html elements
- Added getScrollPos() to get the vertical scroll pos on a page
- Added requestFrame() as polyfill for requestAnimationFrame
- Added getGuid() which returns a side-wide unique uid

## [2.0.5] - 2019-01-30
### Added
- Added ajax() helper to perform BASIC ajax calls to the server

### Changed
- Updated dependencies to the latest versions

### Fixed
- Fixed an issue with flusLib.js which caused the 
- Fixed some issues with scrollToTopOf when using durations

## [2.0.4] - 2019-01-25
### Added
- Added registerEventResizeThrottled() to call a event on when the browser window is resized
- Added loadAsset() helper to load javascript / css assets dynamically
- Added numberAsFileSize() helper to format file sizes for humans
- Added debouncePromise() helper to, well debounce calls of functions which return a promise
- Added maxLength() helper to cut off strings that exceed a given length
- Added stripTags() helper which removes html tags from a string
- Added bindOnReady() to EventBus

### Changed
- isEmpty() now has an additional parameter to check for null conditionally
- The "data-stop-body-scrolling-fixed" attribute can now again accept a "half" value when stopBodyScrolling() is used

### Fixed
- Fixed an issue with UrlHash where the page jumped to the top if no arguments were left

## [2.0.3] - 2019-01-18
### Added
- Added formatDateAndTime() as a js date formatter that work's like php's date()
- Added EventBus to centralize all events we create without tainting the global namespace
- Added UrlHash to manage url parameters after the # tag
- Added getDate() method to read data attributes from html objects

### Changed
- isEmpty() will no longer detect 0 (number) as empty

### Removed
- Removed onReady() and moved the functionallity into EventBus.bindOnReady()

## [2.0.2] - 2019-01-11
### Added
- Added addClass() and removeClass() helpers to manage dom element classes with ease
- Added getLocalStorage() to apply an object based abstraction to the localStorage API
- Added typedoc as documentation renderer

### Changed
- Renamed globalStorage() to getPageStorage() to make it easier to understand what it does.
- Added onChange() hook to GenericStorage which is called when a value is set or deleted

### Fixed
- Reverted changes to asArray() because it caused more problems than it solved

## [2.0.1] - 2019-01-10
### Added
- Added flushLib.js script to clean lib directory before build
- Added npm watch command
- Added closest() implementation as jQuery replacement
- Added getOffset() implementation as jQuery replacement
- Added isFunction() helper
- Added isObject() helper
- Added isPlainObject() helper
- Added scrollToPosition helper
- Added globalStorage() helper
- Added GenericStorage
- Added BreakpointService
- Added isNull()

### Changed
- Rewrite of mergeRecursive and merge to combine them into a single function
- Rewrite of the scrollToTopOf helper to work without jQuery
- Moved all functions into directories to make them more structured
- Changed Typescript settings to work with node as well
- Adds an additional "thousandSeparator" flag to numberAsMoney which is used to drop the periods as separators between number groups

### Removed
- Removed $globj as it is not longer required
- Removed jQuery as dependency 

### Fixed
- Fixed some issues with MoneyToNumber when it came to edge cases while detecting comma chars

## [2.0.0] - 2019-01-09
### Changed
- Branched this library and renamed it to "Helferlein" instead of "helpers.js" 

### Note
- Some helpers are disabled until they are rewritten to work without jquery

## [1.2.0] - 2018-11-23
### Added
- Added new helper moneyAsNumber();
- Added new helper numberAsMoney();
- Added new helper isArray();
- Added new helper isEmpty();
- Added new helper isNumber();
- Added new helper isString();
- Added new helper isUndefined();
- Added new helper merge();
- Added new helper numberAsPercent();
- Added new helper percentAsNumber();
- Added additional documentation
- Added some tests for the new helpers

### Changed
- To handle the growing number of helpers, I sorted some of them into directories. This will help in the long run, but will also break the current "import" statements in your application. 

### Removed
- Removed WebpackChunkLoader from the list of helpers

## [1.1.9] - 2018-11-19
### Added
- Added additional options for the data-fixed-body-scrolling-target targets to make sure they can be adjusted in multiple ways
- Added a new helper "load" to load js files asynchronously 

### Fixed
- Fixed the types of the $globj children to JQuery<HTMLElement>

## [1.1.8] - 2018-11-08
### Added
- Added new ucFirst(), sanitizeString() and checkOnlineState() helpers

## [1.1.7] - 2018-10-26
### Fixed
- Fixed an issue where scrollToTopOf() ignored the previously configured top-offset

### Deprecated
- WebpackChunkLoader is now deprecated! Use @labor/webpack-chunk-loader instead!

## [1.1.6] - 2018-10-18
### Fixed
- Removes unwanted console output when using stopBodyScrolling

## [1.1.5] - 2018-10-18
### Fixed
- Makes map() return "any" instead of {}
- Fixes an issue with stopBodyScrolling on ios

## [1.1.4] - 2018-10-17
### Added
- Added webpackChunkLoader for easier chunk loading on event based requests
- Additional documentation

### Changed
- Fixes issues that occurend when document.documentElement was used instead of document in order to make typescript happy with jQuery
- Makes static objects iterable using forEach, map and so on.

## [1.1.3] - 2018-09-27
### Removed
- Removed "files" node from package.json to make sure all required files end up when installing the package using npm.

## [1.1.2] - 2018-09-25
### Fixed
- Fixed an issue where scrollToTopOf() crashed when options was not given.

## [1.1.1] - 2018-09-25
### Fixed
- Removes unwanted console.log in asObject() helper

## [1.1.0] - 2018-09-24
### Added
- Added some basic tests
- Added isMap: To check if a given object is a set or not
- Added isSet: To check if a given object is a map or not
- Added mergeRecursive: To merge arrays, objects, sets and Maps with each other.
- Added support for map and set on reduce() and map()
- Added "GenericObject" and "JQueryEvent" interfaces
- Added "asArray" and "asObject" helpers
- Added some documentation
- Added "filter" helper

### Changed 
- Converted whole codebase to typescript
- Renames Globj.js to $globj.js to be consistent
- Extracts "IterableHelpers" from "forEach"

### Fixed
- Fixed some issues with include paths when building the library

## [1.0.3] - 2018-09-06
### Added
- Adds a md5 hash implementation
- Adds a helper to select the content of a given jQuery object

### Changed 
- throttledEvent now transfers the instance of the event to the callback.
- forEach callbacks may now return "FALSE" to break the loop

## [1.0.2] - 2018-08-29
### Added
- Adds jQuery support for foreach
- Adds changelog file
- Adds reduce function

### Changed
- Renames all filenames to lcfirst as they contain functions and no classes
- Makes all elements "default" exports

### Fixed
- Fixed an issue where foreach could not be stopped when returning false

## [1.0.1] - 2018-08-28
### Added 
- Adds node_modules to gitignore

## [1.0.0] - 2018-08-23
### Added
- Initial commit added all basic files



The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).
