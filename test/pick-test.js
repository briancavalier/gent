var gent = require('../gent');
var pick = require('../generator/pick');
var reporter = require('../reporter/console');

var run = gent.runner(gent.aggregator(), reporter);

var array = [1, 2, 3, 4, 5];
var string = 'abcdefg';

run(100, gent.test('should pick from array', function(a, array) {
	return array.indexOf(a) >= 0;
}, pick(array), array));

run(100, gent.test('should pick from string', function(a, string) {
	return a.length === 1 && typeof a === 'string' && string.indexOf(a) >= 0;
}, pick(string), string));