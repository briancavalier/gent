var gent = require('../gent');
var array = require('../generator/array');

module.exports = [
	gent.claim('generates an array', function(a) {
		return Array.isArray(a);
	}, array()),

	gent.claim('generates an array with correct length', function(a) {
		return a.length === 3;
	}, array(3)),

	gent.claim('generates an array containing correct types', function(a) {
		return a.reduce(function(pass, x) {
			return pass && typeof x === 'boolean';
		}, true);
	}, array(gent.bool())),

	gent.claim('generates an array w/correct len & containing correct types', function(a) {
		return a.reduce(function(pass, x) {
			return pass && typeof x === 'boolean';
		}, a.length === 3);
	}, array(3, gent.bool())),

	gent.claim('generates an array from template', function(a) {
		return a.length === 3
			&& typeof a[0] === 'boolean'
			&& typeof a[1] === 'number'
			&& typeof a[2] === 'string';
	}, array([gent.bool(), gent.integer(), gent.string(10)])),

	gent.claim('generates array based  template', function(o) {
		return o.hasOwnProperty('a') && o.hasOwnProperty('b')
			&& typeof o.a === 'number' && typeof o.b === 'boolean';
	}, object.template({ a: gent.integer(10), b: true }))

];
