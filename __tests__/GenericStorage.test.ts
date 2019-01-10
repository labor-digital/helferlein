/**
 * Created by Martin Neundorfer on 10.01.2019.
 * For LABOR.digital
 */
import {GenericStorage} from "../src/Entities/GenericStorage";
import {forEach} from "../src/Lists/forEach";

test("GenericStorage construction", () => {
	expect(new GenericStorage()).toBeInstanceOf(GenericStorage);
});

test("GenericStorage get storage link", () => {
	const storage = {"foo": 123};
	const i = new GenericStorage(storage);
	// External storage object
	expect(i.get()).toBe(storage);

	// Auto created storage object
	expect((new GenericStorage()).get()).toEqual({});
});

test("GenericStorage get", () => {
	const storage = {"foo": 123};
	const i = new GenericStorage(storage);
	expect(i.get()).toBe(storage);
	expect(i.get("foo")).toBe(123);
	expect(i.get("bar")).toBe(undefined);
	expect(i.get("bar", 234)).toBe(234);
});

test("GenericStorage set", () => {
	const i = new GenericStorage();
	expect(i.get("foo")).toBe(undefined);
	i.set("foo", "bar");
	expect(i.get("foo")).toBe("bar");
	i.set(1, "baz");
	expect(i.get(1)).toBe("baz");
	expect(i.get("1")).toBe("baz");
	expect(() => {
		// @ts-ignore
		i.set()
	}).toThrow();
	expect(() => {
		// @ts-ignore
		i.set("bar");
	}).toThrow();
});

test("GenericStorage has", () => {
	const i = new GenericStorage();
	expect(i.has("foo")).toBe(false);
	i.set("foo", "bar");
	expect(i.has("foo")).toBe(true);
	expect(i.has("foo2")).toBe(false);
	i.set("foo2", "baz");
	expect(i.has("foo")).toBe(true);
	expect(i.has("foo2")).toBe(true);
	expect(() => {
		// @ts-ignore
		i.has()
	}).toThrow();
});

test("GenericStorage remove", () => {
	const i = new GenericStorage();
	i.set("foo", "bar");
	i.set("foo2", "baz");
	expect(i.get("foo")).toBe("bar");
	expect(i.get("foo2")).toBe("baz");
	expect(i.remove("foo")).toBe(i);
	expect(i.remove("foo2")).toBe(i);
	expect(i.get()).toEqual({});
	expect(() => {
		// @ts-ignore
		i.remove()
	}).toThrow();
});

test("GenericStorage forEach", () => {
	const i = new GenericStorage({foo: 1, bar: 2});
	const e = [];
	i.forEach((v, k) => {
		e.push(k);
		e.push(v);
	});
	expect(e).toEqual(["foo", 1, "bar", 2]);
});

test("GenericStorage forEach function bridge", () => {
	const i = new GenericStorage({foo: 1, bar: 2});
	const e = [];
	forEach(i, (v, k) => {
		e.push(k);
		e.push(v);
	});
	expect(e).toEqual(["foo", 1, "bar", 2]);
});

