# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.30.0](https://github.com/labor-digital/helferlein/compare/v3.29.0...v3.30.0) (2020-11-24)


### Features

* **getGuid:** don't store the guid in the page storage ([68f8f6a](https://github.com/labor-digital/helferlein/commit/68f8f6a49deef8e0ca4d12e3f8f71b2ca6971070))


### Bug Fixes

* optimize imports ([6b7ebd3](https://github.com/labor-digital/helferlein/commit/6b7ebd3f9a6dbbff4ee08c2159e9136e1d3f9f3c))

## [3.29.0](https://github.com/labor-digital/helferlein/compare/v3.28.0...v3.29.0) (2020-11-24)


### Features

* add setFocus helpers ([017a8fe](https://github.com/labor-digital/helferlein/commit/017a8fe2a547532d9b5b19219c1aad528175d875))


### Bug Fixes

* minor code cleanup ([ffe324f](https://github.com/labor-digital/helferlein/commit/ffe324fd10e6590cbce631994c571cb9b5d3aa33))

## [3.28.0](https://github.com/labor-digital/helferlein/compare/v3.27.0...v3.28.0) (2020-11-24)


### Features

* update dependencies ([c830632](https://github.com/labor-digital/helferlein/commit/c830632bfe7f10d878be7c0a563457e73fee51e4))


### Bug Fixes

* **loadAsset:** fix broken promise ([61f243b](https://github.com/labor-digital/helferlein/commit/61f243be1c8189867230773bcb52cc14193409c0))
* **md5:** remove isNode dependency and rely on internal hasher ([73eebdc](https://github.com/labor-digital/helferlein/commit/73eebdcfaafd7771082f5838cf3f7086881fbbb4))

## [3.27.0](https://github.com/labor-digital/helferlein/compare/v3.26.0...v3.27.0) (2020-11-24)


### Features

* implement validateEmail + validateUrl helpers ([fa18306](https://github.com/labor-digital/helferlein/commit/fa18306bd388cf512390219ed59c0676ae7c9744))


### Bug Fixes

* **htmlEncode:** support serverside usage ([9c15286](https://github.com/labor-digital/helferlein/commit/9c15286ba236eaeefcf445db542b31d61300c7d1))

## [3.26.0](https://github.com/labor-digital/helferlein/compare/v3.25.0...v3.26.0) (2020-11-14)


### Features

* update dependencies ([9c2428b](https://github.com/labor-digital/helferlein/commit/9c2428ba08e27f7682eebc97dad651ec5b750ac8))
* **scrollToPosition:** make scroller more reliable + implement dynamic offset + implement break on scroll event ([6959cf0](https://github.com/labor-digital/helferlein/commit/6959cf0c54360eae8f2f4ef0f348cca2f187c204))
* implement isList helper ([2943e51](https://github.com/labor-digital/helferlein/commit/2943e518234f0b2856c4ee3d1dff0e38791cb356))

## [3.25.0](https://github.com/labor-digital/helferlein/compare/v3.24.0...v3.25.0) (2020-09-16)


### Features

* add new helper to check if color is Hex, RGB, RGBA or a valid color name ([ffe0bf1](https://github.com/labor-digital/helferlein/commit/ffe0bf1a285acf85f454f79b0dc58620ad477229))

## [3.24.0](https://github.com/labor-digital/helferlein/compare/v3.23.1...v3.24.0) (2020-09-04)


### Features

* update dependencies ([44ab0e1](https://github.com/labor-digital/helferlein/commit/44ab0e144b0131bf8cbd6811812d89f25570bb79))


### Bug Fixes

* **makeOptions:** add missing path.pop() ([d7b6f16](https://github.com/labor-digital/helferlein/commit/d7b6f16a01055946f7a4d02ac0e347ea4954e13e))

### [3.23.1](https://github.com/labor-digital/helferlein/compare/v3.23.0...v3.23.1) (2020-07-10)


### Bug Fixes

* **copySync:** make sure the copied files stay in their directory ([221e665](https://github.com/labor-digital/helferlein/commit/221e665a71eeb7190100d33b570f8c4f29ce852f))

## [3.23.0](https://github.com/labor-digital/helferlein/compare/v3.22.0...v3.23.0) (2020-07-10)


### Features

* add "copySync" helper ([04a9cc9](https://github.com/labor-digital/helferlein/commit/04a9cc9225413220689cca48bfdf920833aa3d85))

## [3.22.0](https://github.com/labor-digital/helferlein/compare/v3.21.0...v3.22.0) (2020-07-10)


### Features

* implement multiple new helpers ([8715591](https://github.com/labor-digital/helferlein/commit/871559144da58a948d3017ad5c61a7acce37398c))
* make code PSR-2 compliant ([b24a611](https://github.com/labor-digital/helferlein/commit/b24a611d46433e7c4b4df8bc839e5509ae16d5f9))
* make tests PSR-2 compliant ([e9fa8df](https://github.com/labor-digital/helferlein/commit/e9fa8dfcdd6b6b799c26297d224780556f30d37d))
* update dependencies ([fd9e244](https://github.com/labor-digital/helferlein/commit/fd9e244547cede2edb5d27d9015a7c77e9cab180))


### Bug Fixes

* fix browser build ([37a7724](https://github.com/labor-digital/helferlein/commit/37a7724b3ccce2e5b6ab377ea10d56cbf77a4362))

## [3.21.0](https://github.com/labor-digital/helferlein/compare/v3.20.2...v3.21.0) (2020-06-26)


### Features

* **BreakpointService:** push the "is" computation into a breakpoint to allow relative lookups ([097cf88](https://github.com/labor-digital/helferlein/commit/097cf88ac18d351207c0ea8af159ec1d75312a1e))

### [3.20.2](https://github.com/labor-digital/helferlein/compare/v3.20.1...v3.20.2) (2020-06-17)


### Bug Fixes

* **debouncePromise:** make sure the promise generator is only called once ([f7826e5](https://github.com/labor-digital/helferlein/commit/f7826e58ded6e41b387ea8e2f3b06b792121206c))

### [3.20.1](https://github.com/labor-digital/helferlein/compare/v3.20.0...v3.20.1) (2020-04-20)


### Bug Fixes

* **StickyElement:** don't break the script if undefined is given ([787d86a](https://github.com/labor-digital/helferlein/commit/787d86a437363315bdab243d8be0d82a23c70e12))

## [3.20.0](https://github.com/labor-digital/helferlein/compare/v3.19.2...v3.20.0) (2020-04-15)


### Features

* **stickyElement:** allow sticky elements to be placed inside containers ([1f668b8](https://github.com/labor-digital/helferlein/commit/1f668b8917465da4e8997b43c55def0f64747545))

### [3.19.2](https://github.com/labor-digital/helferlein/compare/v3.19.1...v3.19.2) (2020-04-15)


### Bug Fixes

* **ComponentProxy:** make proxy more resilient against crashes ([a7f3389](https://github.com/labor-digital/helferlein/commit/a7f33895da300ed32bc85dc35080976842016184))

### [3.19.1](https://github.com/labor-digital/helferlein/compare/v3.19.0...v3.19.1) (2020-04-15)


### Bug Fixes

* **scrollToPosition:** don't keep trying to scroll if the end of the page was reached ([4ebda7b](https://github.com/labor-digital/helferlein/commit/4ebda7b246e62a37c3dcdce8a3fa4fe065d2a1da))

## [3.19.0](https://github.com/labor-digital/helferlein/compare/v3.18.0...v3.19.0) (2020-04-15)


### Features

* **getOffset:** make sure string containers are supported as well ([50888dc](https://github.com/labor-digital/helferlein/commit/50888dccd7927e4d3afa745526017eb39ad18851))

## [3.18.0](https://github.com/labor-digital/helferlein/compare/v3.17.7...v3.18.0) (2020-04-15)


### Features

* **ScrollToPosition:** Allow scrollToTopOf and scrollToPosition to scroll to valid css selectors as well ([f3a3935](https://github.com/labor-digital/helferlein/commit/f3a3935f8e33e6af7d226d6bc266d5fe60d0ab25))
* make dom helpers not crash if the given "element" is undefined ([675b01f](https://github.com/labor-digital/helferlein/commit/675b01ff152728a54c6d4052c438a747082ab2bf))

### [3.17.7](https://github.com/labor-digital/helferlein/compare/v3.17.6...v3.17.7) (2020-04-13)


### Bug Fixes

* **ComponentProxy:** make sure events can be unbound even while the proxy dies ([bf630da](https://github.com/labor-digital/helferlein/commit/bf630da64617bced134733128af2bf7843100eba))

### [3.17.6](https://github.com/labor-digital/helferlein/compare/v3.17.5...v3.17.6) (2020-04-07)


### Bug Fixes

* **inflectToSlug:** make sure IE does not break when using unicode regex ([d4bf449](https://github.com/labor-digital/helferlein/commit/d4bf44905f716cf83e1087f6017ea5853816be19))

### [3.17.5](https://github.com/labor-digital/helferlein/compare/v3.17.4...v3.17.5) (2020-04-06)


### Bug Fixes

* **inflectToSlug:** make sure special chars are handled correctly ([1476954](https://github.com/labor-digital/helferlein/commit/1476954f1799cf1e9ae89ddc3fc4a41ef2b714b9))

### [3.17.4](https://github.com/labor-digital/helferlein/compare/v3.17.3...v3.17.4) (2020-03-23)

### [3.17.3](https://github.com/labor-digital/helferlein/compare/v3.17.2...v3.17.3) (2020-02-17)

### [3.17.2](https://github.com/labor-digital/helferlein/compare/v3.17.1...v3.17.2) (2020-02-17)

### [3.17.1](https://github.com/labor-digital/helferlein/compare/v3.17.0...v3.17.1) (2020-02-17)


### Bug Fixes

* try to fix npm login issue ([596810a](https://github.com/labor-digital/helferlein/commit/596810aa88b58c36382d8c7ab3b8b033c96945c9))

## [3.17.0](https://github.com/labor-digital/helferlein/compare/v3.16.0...v3.17.0) (2020-02-17)


### Features

* preparation to move to github ([7e05e3e](https://github.com/labor-digital/helferlein/commit/7e05e3e28a3eb51d6bd0986993327e4718203948))


### Bug Fixes

* remove no longer required bitbucket pipeline conifg ([bd34c14](https://github.com/labor-digital/helferlein/commit/bd34c14fc1e7bb81aa2f4c0e0f239d2cbb30637f))
* **forEach:** make sure float keys in object literals are handled as floats when they are passed to the callback ([1bf8198](https://github.com/labor-digital/helferlein/commit/1bf81988c257158aadb4bd676d50b6d90999feb8))

# [3.16.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.16.0%0Dv3.15.1#diff) (2020-01-21)


### Features

* **FormatAndConvert:** make moneyAsNumber more resilient on edge cases ([3a7687c](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/3a7687c))



## [3.15.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.15.1%0Dv3.15.0#diff) (2020-01-07)


### Bug Fixes

* **browserBuild:** make sure the browser build modules can be used in combination with each other ([dfb74a5](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/dfb74a5))



# [3.15.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.15.0%0Dv3.14.0#diff) (2020-01-02)


### Features

* add support to build a packed version of the library ready for the use in a browser ([3a15f6b](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/3a15f6b))



# [3.14.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.14.0%0Dv3.13.2#diff) (2019-12-30)


### Features

* **cloneList:** use the much more advanced clone package for deep cloning objects ([256634f](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/256634f))



## [3.13.2](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.13.2%0Dv3.13.1#diff) (2019-12-30)


### Bug Fixes

* **forEach:** fix another issue with forEach where we run into the maximum call stack size ([48e7916](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/48e7916))



## [3.13.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.13.1%0Dv3.13.0#diff) (2019-12-30)


### Bug Fixes

* **forEach:** fix an issue when an iterated object does not have the hasOwnProperty() function. ([dcf0c6d](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/dcf0c6d))



# [3.13.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.13.0%0Dv3.12.0#diff) (2019-12-30)


### Features

* add new cloneList helper to deep-clone a list or a list-tree ([ac32d16](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/ac32d16))



# [3.12.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.12.0%0Dv3.11.0#diff) (2019-12-23)


### Bug Fixes

* **isArray:** use the builtin array detection if possible ([a74bf68](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/a74bf68))


### Features

* implement HelferleinEventList to allow easier event lookup without consulting the documentation ([bd73f8d](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/bd73f8d))



# [3.11.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.11.0%0Dv3.10.4#diff) (2019-11-10)


### Features

* add new chunks helper to split a list into chunks of fixed length's ([3e7c51a](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/3e7c51a))



## [3.10.4](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.10.4%0Dv3.10.3#diff) (2019-10-31)


### Bug Fixes

* **removeClass:** fix issue where remaining classes ended up without a space between them ([0fe9984](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/0fe9984))
* **Ui:** make ui methods aware of being used in an SSR environment, to prevent crashing ([6442a7d](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/6442a7d))



## [3.10.3](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.10.3%0Dv3.10.2#diff) (2019-10-11)


### Bug Fixes

* **makeOptions:** fix issue where "boolean" could not be validated correctly ([0281600](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/0281600))



## [3.10.2](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.10.2%0Dv3.10.1#diff) (2019-10-10)


### Bug Fixes

* **scrollToPosition:** scrolling now works correctly on iOs ([e709465](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/e709465))



## [3.10.1](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.10.1%0Dv3.10.0#diff) (2019-10-09)



# [3.10.0](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.10.0%0Dv3.9.2#diff) (2019-10-09)


### Bug Fixes

* **Browser:** avoid crashing when browser helpers are called in a non-browser environment ([0e404da](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/0e404da))
* **DomEvents:** avoid crashing when dom event helpers are called in a non-browser environment ([14f4893](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/14f4893))
* **getBackgroundColor:** avoid crashing when the background color of an element is requested in a non-browser environment ([543db4b](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/543db4b))
* **makeOptions:** allow generic string as "type" to avoid strange typescript errors ([2dd5138](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/2dd5138))
* testing for an iOs bug I can only test in production ([446c481](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/446c481))
* **makeOptions:** simplify the type map and fix typescript issue ([c8fc72e](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/c8fc72e))


### Features

* add fallbacks to getLocalStorage() and getPageStorage() to make both functions independent of the browser's window object. ([8666bf5](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/8666bf5))
* add new helpers to check if the script runs in a browser or on a node server ([b2fb73d](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/b2fb73d))
* **Events:** add emitHook() for sequential event listener execution and event priorities ([1260591](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/1260591))
* **md5:** add node js shortcut for md5 generation ([dc874c2](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/dc874c2))
* **PlainObject:** allow the plain object type to have a defined subtype ([5998242](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/5998242))
* update dependencies ([a72dcef](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/a72dcef))



## [3.9.2](https://bitbucket.org/labor-digital/labor-js-helpers.js/branches/compare/v3.9.2%0Dv3.9.1#diff) (2019-08-14)


### Bug Fixes

* **moneyAsNumber:** make sure money values with a comma at the beginning or the end are parsed correctly ([b88312b](https://bitbucket.org/labor-digital/labor-js-helpers.js/commits/b88312b))



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
