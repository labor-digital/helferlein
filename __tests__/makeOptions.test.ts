/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.07.25 at 14:36
 */

import makeOptions from "../src/Misc/makeOptions";

test("makeOptions simple", () => {
	expect(makeOptions({
		foo: 123,
		baz: "bar"
	}, {
		foo: {
			type: "number"
		},
		bar: {
			default: 123
		},
		baz: {
			type: ["string"],
			default: "foo"
		}
	})).toEqual({
		foo: 123,
		bar: 123,
		baz: "bar"
	});
});

test("makeOptions with children", () => {
	const map = new Map();
	map.set("asdf", 234);
	
	const mapResult = new Map();
	mapResult.set("asdf", 234);
	mapResult.set("asdf2", "hello world");
	
	expect(makeOptions({
		foo: 123,
		baz: "bar",
		child: {
			map: map
		}
	}, {
		foo: {
			type: "number"
		},
		bar: {
			default: 123
		},
		baz: {
			type: ["string"],
			default: "foo"
		},
		child: {
			default: () => {
				return {};
			},
			children: {
				foo: {
					type: "numeric",
					default: 123
				},
				map: {
					default: () => new Map(),
					children: {
						asdf: {
							type: "number",
							default: 777
						},
						asdf2: {
							type: "string",
							default: "hello world"
						}
					}
				}
			}
		}
	})).toEqual({
		foo: 123,
		bar: 123,
		baz: "bar",
		child: {
			foo: 123,
			map: mapResult
		}
	});
});


test("makeOptions with children defaults", () => {
	const resultMap = new Map();
	resultMap.set("foo", 123);
	resultMap.set("bar", "hello");
	expect(makeOptions({}, {
		child: {
			default: () => {
				return {};
			},
			children: {
				foo: {
					default: () => new Map(),
					children: {
						foo: {
							default: 123
						},
						bar: {
							default: () => "hello"
						}
					}
				},
				bar: {
					default: 123
				}
			}
		}
	})).toEqual({
		child: {
			foo: resultMap,
			bar: 123
		}
	});
});

test("makeOptions error on unknown value", () => {
	expect(() => {
		makeOptions({
			foo: 123
		}, {
			bar: {
				default: "",
				type: "string"
			}
		});
	}).toThrowError();
});

test("makeOptions error on invalid value type", () => {
	expect(() => {
		makeOptions({
			foo: 123
		}, {
			foo: {
				default: "",
				type: "string"
			}
		});
	}).toThrowError();
});

test("makeOptions error on invalid value", () => {
	expect(() => {
		makeOptions({
			foo: 123
		}, {
			foo: {
				default: "",
				values: [234, 2435]
			}
		});
	}).toThrowError();
});

test("makeOptions success on valid value", () => {
	expect(makeOptions({
		foo: 123
	}, {
		foo: {
			default: "",
			values: [123, 2435]
		}
	})).toEqual({foo: 123});
});

test("makeOptions error on custom validator", () => {
	expect(() => {
		makeOptions({
			foo: 123
		}, {
			foo: {
				default: "",
				validator: (v) => {
					if (v === 123) return "This is wrong!";
					return true;
				}
			}
		});
	}).toThrowError();
});

test("makeOptions type validations", () => {
	expect(makeOptions({a: true}, {a: {type: "bool"}})).toEqual({a: true});
	expect(makeOptions({a: true}, {a: {type: "boolean"}})).toEqual({a: true});
	expect(makeOptions({a: 1}, {a: {type: "number"}})).toEqual({a: 1});
	expect(makeOptions({a: 1}, {a: {type: "numeric"}})).toEqual({a: 1});
	expect(makeOptions({a: "1"}, {a: {type: "numeric"}})).toEqual({a: "1"});
	expect(makeOptions({a: "string"}, {a: {type: "string"}})).toEqual({a: "string"});
	expect(makeOptions({a: []}, {a: {type: "array"}})).toEqual({a: []});
	expect(makeOptions({a: {}}, {a: {type: "plainObject"}})).toEqual({a: {}});
	expect(makeOptions({a: {}}, {a: {type: "plainobject"}})).toEqual({a: {}});
	expect(makeOptions({a: true}, {a: {type: "true"}})).toEqual({a: true});
	expect(makeOptions({a: false}, {a: {type: "false"}})).toEqual({a: false});
	expect(makeOptions({a: undefined}, {a: {type: "undefined"}})).toEqual({a: undefined});
	expect(makeOptions({a: null}, {a: {type: "null"}})).toEqual({a: null});
});