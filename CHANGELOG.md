# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
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
