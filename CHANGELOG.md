# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Changed 
- Renames Globj.js to $globj.js to be consistent

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
