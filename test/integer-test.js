var gent = require('../gent');
var integer = require('../generator/integer');
var reporter = require('../reporter/console');

var run = gent.run.bind(gent, reporter, gent.aggregator());

run(gent.take(100, gent.test('should produce values in range', function(a) {
	return typeof a === 'number'
		&& Math.floor(a) === a
		&& a >= 0 && a < 10;
}, integer(0, 10))));

run(gent.take(100, gent.test('should produce values in range w/o lower bound', function(a) {
	return typeof a === 'number'
		&& Math.floor(a) === a
		&& a >= 0 && a < 10;
}, integer(10))));

run(gent.take(10, gent.test('should have inclusive exclusive bounds', function(a) {
	return a === 1;
}, integer(1, 2))));

run(gent.take(1000, gent.test('should generate positive integers w/o args', function(a) {
	return typeof a === 'number'
		&& Math.floor(a) === a
		&& a >= 0;
}, integer())));