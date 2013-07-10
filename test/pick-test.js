var gent = require('../gent');
var pick = require('../generator/pick');
var reporter = require('../reporter/console');

var run = gent.run.bind(gent, reporter, gent.aggregator());

var array = [1, 2, 3, 4, 5];
var string = 'abcdefg';

run(gent.take(100, gent.test('should pick from array', function(a, array) {
	return array.indexOf(a) >= 0;
}, pick(array), array)));

run(gent.take(100, gent.test('should pick from string', function(a, string) {
	return typeof a === 'string' && a.length === 1 && string.indexOf(a) >= 0;
}, pick(string), string)));