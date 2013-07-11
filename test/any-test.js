var gent = require('../gent');
var reporter = require('../reporter/console');
var any = require('../generator/any');

var run = gent.run.bind(gent, reporter, gent.aggregator());

run(gent.take(100, gent.test('should execute', function(a) {
	return a || !a;
}, any())));