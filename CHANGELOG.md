# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
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
