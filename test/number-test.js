var gent = require('../gent');
var reporter = require('../reporter/console');
var number = require('../generator/number');

var run = gent.run.bind(gent, reporter, gent.aggregator());

run(gent.take(100, gent.test('should produce values in range', function(a) {
	return typeof a === 'number'
		&& a >= 0 && a < 10;
}, number(0, 10))));

run(gent.take(100, gent.test('should produce values in range w/o lower bound', function(a) {
	return typeof a === 'number'
		&& a >= 0 && a < 10;
}, number(10))));
