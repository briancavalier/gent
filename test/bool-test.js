var gent = require('../gent');
var reporter = require('../reporter/console');
var bool = require('../generator/bool');

var run = gent.run.bind(gent, reporter, gent.aggregator());

// TODO: Test that values are a binomial distribution
run(gent.take(100, gent.test('should generate boolean values', function(b) {
	return typeof b === 'boolean';
}, bool())));
