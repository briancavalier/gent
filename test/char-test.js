var gent = require('../gent');
var char = require('../generator/char');

var first = String.fromCharCode(32);
var last = String.fromCharCode(127);

// TODO: Test that chars are a normal distribution
module.exports = [
	gent.claim('generates chars in range', function(c) {
		return 'a' <= c && c <= 'z';
	}, char('a', 'z')),

	gent.claim('generates chars in integer range', function(c) {
		return first <= c && c <= last;
	}, char(32, 127))
];
