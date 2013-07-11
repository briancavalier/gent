var buster, gent;

buster = require('buster');
gent = require('../../gent');

buster.assertions.add("scenario", {
	assert: function(test) {
		var failures = gent.run(checkGentResults, gent.aggregator(), test);

		if(failures.length) {
			this.failures = failures.join(', ');
			return false;
		}

		return true;
	},
	assertMessage: "Expected inputs to pass: ${failures}",
	refuteMessage: "Expected inputs to fail: ${failures}",
	expectation: "toBeUpheld"
});

function checkGentResults(results) {
	return Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			failures = failures.concat(category.fail.map(function(failure) {
				return '{ args: ' + failure.args.join(', ') + ', result: ' + (failure.result || failure.error) + ' }';
			}));
		}

		return failures;
	}, []);
}
