var gent = require('../gent');
var string = require('../generator/string');
var integer = require('../generator/integer');
var reporter = require('../reporter/console');

var chars = 'abcdefg';

var run = gent.run.bind(gent, reporter, gent.aggregator());

run(gent.take(100, gent.test('should generate exact length', function(s) {
	return s.length === 10;
}, string(10, chars))));

run(gent.take(100, gent.test('should generate correct length', function(s) {
	return s.length <= 10;
}, string(integer(10), chars))));

run(gent.take(100, gent.test('should generate strings w/o args', function(s) {
	return typeof s === 'string';
}, string())));
