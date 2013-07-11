var gent = require('../gent');
var char = require('../generator/char');
var reporter = require('../reporter/console');

var first = String.fromCharCode(32);
var last = String.fromCharCode(127);

var run = gent.run.bind(gent, reporter, gent.aggregator());

// TODO: Test that chars are a normal distribution
run(gent.take(100, gent.test('should generate chars in range', function(c) {
	return 'a' <= c && c <= 'z';
}, char('a', 'z'))));

run(gent.take(100, gent.test('should generate chars in integer range', function(c) {
	return first <= c && c <= last;
}, char(32, 127))));
