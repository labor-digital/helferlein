import {mergeRecursive} from "../src/mergeRecursive";

test('Simple array merge', ()=> {
	expect(mergeRecursive([1, 2], [3,4])).toEqual([1,2,3,4]);
});

test('Simple multi array merge', ()=> {
	expect(mergeRecursive([1, 2], [3,4], [5,6])).toEqual([1,2,3,4,5,6]);
});

test('Recursive array merge', ()=> {
	expect(mergeRecursive([1, [2,3]], [6,[4,5],7])).toEqual([1,[2,3,4,5],6,7]);
});

test('Simple object merge', ()=> {
	expect(mergeRecursive({
		a: 1,
		b: 2
	}, {
		c: 3,
		d: 4
	})).toEqual({
		a: 1,
		b: 2,
		c: 3,
		d: 4
	});
});


test('Recursive object merge', ()=> {
	expect(mergeRecursive({
		a: 1,
		b: 2,
		c: {
			a: 'a',
			b: 'b',
			c: [1,2,3]
		},
		d: []
	}, {
		c: {
			a: 'foo',
			c: [4,5,6]
		},
		d: {
			1: 'a',
			2: 'b'
		}
	})).toEqual({
		a: 1,
		b: 2,
		c: {
			a: 'foo',
			b: 'b',
			c: [1,2,3,4,5,6]
		},
		d: ['a', 'b']
	});
});

test('Simple set merge', ()=> {
	let a = new Set();
	a.add(1);
	a.add(2);
	let b = new Set();
	b.add(1);
	b.add(3);
	b.add(4);

	let c = new Set();
	c.add(1);
	c.add(2);
	c.add(3);
	c.add(4);

	expect(mergeRecursive(a, b)).toEqual(c);
});

test('Recursive set merge', ()=> {
	let a = new Set();
	a.add(1);
	a.add([1,2]);
	a.add(3);
	let b = new Set();
	b.add(1);
	b.add([2,3,4]);
	b.add(4);

	let c = new Set();
	c.add(1);
	c.add([1,2,3,4]);
	c.add(3);
	c.add(4);

	expect(mergeRecursive(a, b)).toEqual(c);
});

test('Simple map merge', ()=> {
	let a = new Map();
	a.set(0,1);
	a.set(1,2);
	let b = new Map();
	b.set(2,1);
	b.set(3,3);
	b.set(4,4);

	let c = new Map();
	c.set(0,1);
	c.set(1,2);
	c.set(2,1);
	c.set(3,3);
	c.set(4,4);

	expect(mergeRecursive(a, b)).toEqual(c);
});

test('Recursive map merge', ()=> {
	let a = new Map();
	a.set(0,1);
	a.set(1,2);
	a.set(2, new Map());

	let b = new Map();
	b.set(2,{
		'foo': [123],
		'bar': 'baz',
		1: 5
	});
	b.set(3,3);
	b.set(4,4);

	let c = {
		2: [2,4]
	};

	let d1 = new Map();
	d1.set('foo', [123]);
	d1.set('bar', 'baz');
	d1.set(0, 2);
	d1.set(1, 4);

	let d = new Map();
	d.set(0,1);
	d.set(1,2);
	d.set(2,d1);
	d.set(3,3);
	d.set(4,4);

	expect(mergeRecursive(a, b, c)).toEqual(d);
});
