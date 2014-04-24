var maxIterations = 10000;
var maxReportErrors = 10;

var buster = require('buster');
var format = buster.formatio;
var gent = require('../gent');
var assertion = require('./assertion');

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

	if(typeof options.formatArgs === 'undefined') {
		options.formatArgs = function(args) {
			return format.ascii(args);
		}
	}

	return assertion(claim, options);

	function handleFailures(failures) {
		var count = failures.length;
		self.failures = failures.slice(0, maxReportErrors).join('');

		if(count > maxReportErrors) {
			self.failures += '\n\t... and ' + (count-maxReportErrors) + ' more ...';
		}

		return false;
	}
}
