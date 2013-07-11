var gent = require('../gent');
var reporter = require('../reporter/console');
var falsy = require('../generator/falsy');

var run = gent.run.bind(gent, reporter, gent.aggregator());

run(gent.take(10, gent.test('should be falsy', function(a) {
	return !a;
}, falsy())));