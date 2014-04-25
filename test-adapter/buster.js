var maxIterations = 10000;
var maxReportErrors = 10;

var buster = require('buster');
var gent = require('../gent');
var check = require('./check');

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
	var self = this;
	if(!options) {
		options = {};
	}

	if(typeof options.handleFailures === 'undefined') {
		options.handleFailures = handleFailures;
	}

	return check(claim, options);

	function handleFailures(failures) {
		var count = failures.length;
		
		if(count === 0) {
			return true;
		}

		self.failures = Object.keys(failures).slice(0, maxReportErrors).map(function(k) {
			return failures[k];
		}).join('');

		if(count > maxReportErrors) {
			self.failures += '\n\t... and ' + (count-maxReportErrors) + ' more ...';
		}

		return false;
	}
}
