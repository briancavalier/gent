var gent = require('../gent');
var integer = require('../generator/integer');
var reporter = require('../reporter/console');

var run = gent.runner(gent.aggregator(), reporter);

run(100, gent.test('should produce values in range', function(a) {
	return typeof a === 'number'
		&& Math.floor(a) === a
		&& a >= 0 && a < 10;
}, integer(0, 10)));

run(100, gent.test('should produce values in range w/o lower bound', function(a) {
	return typeof a === 'number'
		&& Math.floor(a) === a
		&& a >= 0 && a < 10;
}, integer(10)));

run(10, gent.test('should have inclusive exclusive bounds', function(a) {
	return a === 1;
}, integer(1, 2)));