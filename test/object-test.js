var gent = require('../gent');
var object = require('../generator/object');

var sentinel = { value: 'sentinel' };

module.exports = [
	gent.claim('generates an object', function(o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}, object()),

	gent.claim('generates a exact number of keys', function(o) {
		return Object.keys(o).length === 3;
	}, object(3, gent.sequence(['a', 'b', 'c']))),

	gent.claim('generates specified values', function(o) {
		return Object.keys(o).reduce(function(ok, key) {
			return ok && o[key] === sentinel;
		}, true);
	}, object(100, gent.sequence(['a', 'b', 'c']), sentinel)),

	gent.claim('generates same keys as template', function(o) {
		return o.hasOwnProperty('a') && o.hasOwnProperty('b')
			&& typeof o.a === 'number' && typeof o.b === 'boolean';
	}, object.template({ a: gent.integer(10), b: true }))
];
