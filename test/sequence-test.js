var gent = require('../gent');
var sequence = require('../generator/sequence');

var array = [1, 2, 3, 4, 5];
var types = ['number', 'string', 'boolean'];

module.exports = [
	gent.claim('sequences over array', function(a, array, count) {
		return a === array[count % array.length];
	}, sequence(array), array, gent.increment()),

	gent.claim('sequences over arguments', function(a, array, count) {
		return a === array[count % array.length];
	}, sequence.apply(void 0, array), array, gent.increment()),

	gent.claim('sequences over generators', function(a, types, count) {
		return typeof a === types[count % types.length];
	}, sequence(gent.number(), gent.string(), gent.bool()), types, gent.increment())
];
