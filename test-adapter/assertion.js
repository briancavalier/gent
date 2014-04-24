var maxReportErrors = 10;

var gent = require('../gent');
var confidence = require('../generator/confidence');

module.exports = assertValidClaim;

function assertValidClaim(claim, options) {
	if(!options) {
		options = {};
	}

	var results = gent.test(confidence(claim, options.confidence), options);
	var handleResults = options.handleResults || defaultHandleResults;

	return handleResults(results, options);
}

function getFailures (results, formatArgs) {
	return Object.keys(results).reduce(function (failures, key) {
		var category = results[key];
		if (category.fail.length) {
			failures = failures.concat(category.fail.map(function (failure) {
				var args = '\n\t[' + formatArgs(failure.args) + ']';
				if (failure.error) {
					args += ', error: ' + failure.error;
				}
				return args;
			}));
		}

		return failures;
	}, []);
}

function defaultHandleResults(results, options) {
	var formatArgs = options.formatArgs || defaultFormatArgs;
	var handleFailures = options.handleFailures || throwClaimError;

	if(typeof options.formatArgs !== 'function') {
		formatArgs = defaultFormatArgs;
	}

	var failures = getFailures(results, formatArgs);

	return failures.length ? handleFailures(failures) : true;
}

function throwClaimError(failures) {
	var count = failures.length;
	var msg = failures.slice(0, maxReportErrors).join('');
	if (count > maxReportErrors) {
		msg += '\n\t... and ' + (count - maxReportErrors) + ' more ...';
	}

	throw new ClaimFailedError(msg);
}

function ClaimFailedError(msg) {
	Error.call(this);
	this.message = msg;
	this.name = this.constructor.name;
	if(typeof Error.captureStackTrace === 'function') {
		Error.captureStackTrace(this, this.constructor);
	}
}

ClaimFailedError.prototype = Object.create(Error.prototype);
ClaimFailedError.prototype.constructor = ClaimFailedError;

function defaultFormatArgs(args) {
	return args.join(', ');
}