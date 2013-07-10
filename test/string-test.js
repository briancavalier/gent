var gent = require('../gent');
var string = require('../generator/string');
var integer = require('../generator/integer');
var reporter = require('../reporter/console');

var chars = 'abcdefg';

var run = gent.runner(gent.aggregator(), reporter);

run(100, gent.test('should generate exact length', function(s) {
	return s.length === 10;
}, string(10, chars)));

run(100, gent.test('should generate correct length', function(s) {
	console.log(s);
	return s.length <= 10;
}, string(integer(10), chars)));