var gent = require('../gent');
var reporter = require('../reporter/console');
var truthy = require('../generator/truthy');

var run = gent.run.bind(gent, reporter, gent.aggregator());

run(gent.take(10, gent.test('should be truthy', function(a) {
	return !!a;
}, truthy())));