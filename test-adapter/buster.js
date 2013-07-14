var buster, gent, confidence, maxIterations;

maxIterations = 10000;

buster = require('buster');
gent = require('../gent');
confidence = require('../generator/confidence');

buster.assertions.add('validClaim', {
	assert: assertValidClaim,
	assertMessage: 'Expected inputs to pass: ${failures}',
	refuteMessage: 'Expected inputs to fail: ${failures}',
	expectation: 'toBeUpheld'
});

buster.assertions.add('claim', {
	assert: assertClaim,
	assertMessage: 'Expected inputs to pass: ${failures}',
	refuteMessage: 'Expected inputs to fail: ${failures}',
	expectation: 'toBeUpheld'
});

function assertClaim() {
	return assertValidClaim(gent.claim.apply(gent, arguments),
		{ iterations: maxIterations });
}

function assertValidClaim(claim, options) {
	var failures = checkGentResults(gent.test(confidence(claim, options.confidence), options));

	if(failures.length) {
		this.failures = failures.join(', ');
		return false;
	}

	return true;
}

function checkGentResults(results) {
	return Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			failures = failures.concat(category.fail.map(function(failure) {
				var args = '{ args: [' + failure.args.join(', ') + ']';
				if(failure.error) {
					args += ', error: ' + failure.error;
				}
				return args + ' }';
			}));
		}

		return failures;
	}, []);
}
