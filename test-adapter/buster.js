var maxIterations = 10000;
var maxReportErrors = 10;

var buster = require('buster');
var format = buster.formatio;
var gent = require('../gent');
var confidence = require('../generator/confidence');

buster.referee.add('validClaim', {
	assert: assertValidClaim,
	assertMessage: 'Expected inputs to pass: ${failures}',
	refuteMessage: 'Expected inputs to fail: ${failures}',
	expectation: 'toBeUpheld'
});

buster.referee.add('claim', {
	assert: assertClaim,
	assertMessage: 'Expected inputs to pass: ${failures}',
	refuteMessage: 'Expected inputs to fail: ${failures}',
	expectation: 'toBeUpheld'
});

function assertClaim() {
	return assertValidClaim.call(this, gent.claim.apply(gent, arguments),
		{ iterations: maxIterations });
}

function assertValidClaim(claim, options) {
	var failures = checkGentResults(gent.test(confidence(claim, options.confidence), options));

	var count = failures.length;
	if(count) {

		this.failures = failures.slice(0, maxReportErrors).join('');
		if(count > maxReportErrors) {
			this.failures += '\n\t... and ' + (count-10) + ' more ...';
		}
		return false;
	}

	return true;
}

function checkGentResults(results) {
	return Object.keys(results).reduce(function(failures, key) {
		var category = results[key];
		if(category.fail.length) {
			failures = failures.concat(category.fail.map(function(failure) {
				var args = '\n\t[' + format.ascii(failure.args) + ']';
				if(failure.error) {
					args += ', error: ' + failure.error;
				}
				return args;
			}));
		}

		return failures;
	}, []);
}
